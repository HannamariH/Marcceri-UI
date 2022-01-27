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

  const [file, setFile] = useState()
  const [vendor, setVendor] = useState()
  const [umSuccess, setUmSuccess] = useState()
  const [marcSent, setMarcSent] = useState(false)
  const [conversionMessage, setConversionMessage] = useState("")
  const [convertedTitles, setConvertedTitles] = useState([])
  const [postedToKoha, setPostedToKoha] = useState(false)
  const [kohaSuccess, setKohaSuccess] = useState()
  const [biblionumbers, setBiblionumbers] = useState([])
  const [checked, setChecked] = useState([])
  const [fileType, setFileType] = useState()
  const [authorized, setAuthorized] = useState()

  const checkUser = () => {
    //TODO: tarkista apista, onko pyynnön headerissa oleva s-posti config-tiedostossa
    //setAuthorized
  }

  const handleFile = (event) => {
    const file = event.target.files[0]
    console.log("file.type", file.type)
    if (fileTypeValid(file)) {
      setFile(file)
      setFileType(file.type)
      console.log(file.name)
    } else {
      //TODO: parempi virheilmoitus
      alert(`wrong file type! ${file.type}`)
      event.target.value = null
    }
  }

  const fileTypeValid = (file) => {
    //TODO: marc-tiedosto ei olekaan tyyppiä "application/marc"! ei näytä olevan tyyppiä ollenkaan...
    //TODO: onko hyväksyttävä .mrc-päätteen tarkistus?
    if (file.name.substring(file.name.lastIndexOf(".")) === ".mrc") {
      return true
    }
    const validTypes = ["application/marc", "application/marcxml+xml", "text/xml", "application/zip", /*"multipart/mixed" zip??*/]
    return validTypes.includes(file.type)
  }

  const handleVendor = (event) => {
    setVendor(event.target.value)
    console.log(event.target.value)
  }

  const sendFile = async () => {
    if (file === undefined) {
      //TODO: parempi virheilmoitus
      console.log("choose a file first")
    } else {
      setMarcSent(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("ini", vendor)
      formData.append("filetype", fileType)

      axios({
        method: "POST",
        url: "http://localhost:3000/convert",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }).then((response) => {
        setFile()
        setVendor()
        setUmSuccess(true)
        setConversionMessage(response.data.data)
        setConvertedTitles(response.data.titles)
        setChecked(new Array(response.data.titles.length).fill(true))
      }).catch(error => {
        console.log(error)
        setUmSuccess(false)
      })
    }
  }

  const postToKoha = (bibliosToPost) => {

    if (!bibliosToPost.includes(true)) {
      //TODO: parempi virheilmoitus?
      alert("Valitse ainakin yksi tietue!")
      return
    }

    setPostedToKoha(true)

    axios({
      method: "POST",
      //TODO: portti 4000 pelkkään nodeen, 3000 dockeroituun usemarconiin!
      url: "http://localhost:3000/tokoha",
      data: bibliosToPost
    }).then((response) => {
      setKohaSuccess(true)
      setBiblionumbers(response.data.biblionumbers)
      console.log(response.data.biblionumbers)
    }).catch(error => {
      console.log(error.response.data.error)
      setKohaSuccess(error.response.data.error)
    })
  }

  return (
    <>
      <Navbar className="navbar-custom"><Container><h1><a className="link" href="index.html">Marcceri</a></h1></Container></Navbar>
      <UploadForm marcSent={marcSent} handleFile={handleFile} handleVendor={handleVendor} sendFile={sendFile}></UploadForm>
      <Form>
        <Stack gap={3} className="stack-custom">
          <Container><CustomAlert marcSent={marcSent} postedToKoha={postedToKoha} umSuccess={umSuccess} conversionMessage={conversionMessage}></CustomAlert></Container>
          <Container><MarcList umSuccess={umSuccess} postedToKoha={postedToKoha} convertedTitles={convertedTitles} postToKoha={postToKoha} checked={checked} setChecked={setChecked}></MarcList></Container>
          <Container><BiblioList kohaSuccess={kohaSuccess} biblionumbers={biblionumbers} convertedTitles={convertedTitles} checked={checked}></BiblioList></Container>
          <Container>
            <Button variant="secondary" type="submit" className="mb-5">Aloita alusta</Button>
          </Container>
        </Stack>
      </Form>
    </>
  )
}

export default App
