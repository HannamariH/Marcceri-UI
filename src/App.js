import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import UploadForm from "./components/UploadForm"
import CustomAlert from "./components/CustomAlert"
import MarcList from "./components/MarcList"
import BiblioList from "./components/BiblioList"
import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  //tarkistaa, että käyttäjän sähköpostiosoite on sallittujen joukossa (ja että api on käynnissä)
  const checkUser = () => {
    axios.get("/s/marcceri/api/auth")
      .then(() => {
        setAuthorized(true)
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setAuthorized(false)
        } else {
          setApiError(true)
        }
      })
  }

  const [authorized, setAuthorized] = useState(checkUser)
  const [apiError, setApiError] = useState(false)
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()
  const [vendor, setVendor] = useState()
  const [umSuccess, setUmSuccess] = useState()
  const [marcSent, setMarcSent] = useState(false)
  const [conversionMessage, setConversionMessage] = useState("")
  const [convertedTitles, setConvertedTitles] = useState([])
  const [conversionError, setConversionError] = useState([])
  const [checked, setChecked] = useState([])
  const [checkedTitles, setCheckedTitles] = useState([])
  const [postedToKoha, setPostedToKoha] = useState(false)
  const [kohaSuccess, setKohaSuccess] = useState()
  const [biblios, setBiblios] = useState([])
  
  const handleFile = (event) => {
    const file = event.target.files[0]
    if (fileTypeValid(file)) {
      setFile(file)
      setFileType(file.type)
    } else {
      alert(`Virheellinen tiedostotyyppi! ${file.type}`)
      event.target.value = null
    }
  }

  const fileTypeValid = (file) => {
    //marc-tiedosto tarkistettava päätteen mukaan (tiedostolla ei tyyppiä)
    if (file.name.substring(file.name.lastIndexOf(".")) === ".mrc") {
      return true
    }
    const validTypes = ["application/marc", "application/marcxml+xml", "text/xml", "application/zip"]
    return validTypes.includes(file.type)
  }

  const handleVendor = (event) => {
    setVendor(event.target.value)
  }

  const removeErroneousTitles = (titles, recordsWithError) => {
    let errorTitles = []
    for (let i = 0; i < recordsWithError.length; i++) {
      const index = recordsWithError[i].titleNumber
      errorTitles.push(titles[index-1])
      titles.splice(index-1, 1)
    }
    return titles
  }

  const sendFile = async () => {
    if (file === undefined || vendor === undefined) {
      alert("Valitse tiedosto ja/tai toimittaja!")
    } else {
      setMarcSent(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("ini", vendor)
      formData.append("filetype", fileType)
      formData.append("filename", file.name)

      axios({
        method: "POST",
        url: "/s/marcceri/api/convert",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }).then((response) => {
        setFile()
        setVendor()
        setUmSuccess(true)
        setConversionMessage(response.data.conversionMessage)
        let titles = response.data.titles
        if (response.data.errorRecords.length !== 0) {
          setConversionError(response.data.errorRecords)
          titles = removeErroneousTitles(response.data.titles, response.data.errorRecords)
        }       
        setConvertedTitles(titles)
        setCheckedTitles(titles)
        setChecked(new Array(titles.length).fill(true))
      }).catch(error => {
        console.log(error)
        setUmSuccess(false)
      })
    }
  }

  const postToKoha = (titlesToPost) => {

    if (titlesToPost.length === 0) {
      alert("Valitse ainakin yksi tietue!")
      return
    }

    setPostedToKoha(true)

    axios({
      method: "POST",
      url: "/s/marcceri/api/tokoha",
      data: {
        titles: titlesToPost
      }  
    }).then((response) => {
      setKohaSuccess(true)
      setBiblios(response.data.biblios)
    }).catch(error => {
      setKohaSuccess(error.response.data.error)
      setBiblios(error.response.data.biblios)
    })
  }


  return (
    <>
      <Navbar className="navbar-custom"><Container><h1><a className="link" href="index.html">Marcceri</a></h1></Container></Navbar>
      <Stack gap={3}>
        <Container><CustomAlert authorized={authorized} apiError={apiError} conversionError={conversionError} marcSent={marcSent} postedToKoha={postedToKoha} kohaSuccess={kohaSuccess} umSuccess={umSuccess} conversionMessage={conversionMessage}></CustomAlert></Container>
        <UploadForm authorized={authorized} marcSent={marcSent} handleFile={handleFile} handleVendor={handleVendor} sendFile={sendFile}></UploadForm>
        <Form style={{ display: authorized ? 'block' : 'none' }}>
          <Container><MarcList checkedTitles={checkedTitles} setCheckedTitles={setCheckedTitles} umSuccess={umSuccess} postedToKoha={postedToKoha} convertedTitles={convertedTitles} postToKoha={postToKoha} checked={checked} setChecked={setChecked}></MarcList></Container>
          <Container><BiblioList kohaSuccess={kohaSuccess} biblios={biblios} convertedTitles={convertedTitles} checked={checked}></BiblioList></Container>
          <Container><Button variant="secondary" type="submit" className="mb-5 mt-5">Aloita alusta</Button></Container>
        </Form>
      </Stack>
    </>
  )
}

export default App
