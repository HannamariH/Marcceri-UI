import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import CustomAlert from "./components/CustomAlert"
import MarcList from "./components/MarcList"
import BiblioList from "./components/BiblioList"
import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [file, setFile] = useState()
  const [vendor, setVendor] = useState()
  const [umSuccess, setUmSuccess] = useState()
  const [conversionMessage, setConversionMessage] = useState("")
  const [convertedTitles, setConvertedTitles] = useState([])
  const [kohaSuccess, setKohaSuccess] = useState()
  const [biblionumbers, setBiblionumbers] = useState([])
  const [checked, setChecked] = useState([])

  const handleFile = (event) => {
    const file = event.target.files[0]
    console.log("file.type", file.type)
    if (fileTypeValid(file)) {
      setFile(file)
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

      //TODO alla oleva näkyy toimivan, kun buttonin input type on submit. Se myös nollaa samalla kaiken ui:sta.
      //event.target.reset()
      /*setFile()
      setVendor()
      setUmSuccess(true)*/

      const formData = new FormData()
      formData.append("file", file)
      formData.append("ini", vendor)

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

      //TODO: miten ja missä vaiheessa tyhjennetään tiedoston nimi fileuploadista (tai koko lomake)?
    }
  }

  const postToKoha = (bibliosToPost) => {

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
      console.log(error)
      setKohaSuccess(false)
    })
  }

  return (
    <>
      <Navbar className="navbar-custom"><Container><h1><a className="link" href="index.html">Marcceri</a></h1></Container></Navbar>
      <Form>
        <Stack gap={3} className="stack-custom">
          <Container>
            <label htmlFor="fileupload" className="mb-2">Marc-tiedosto (mrc-, xml- tai zip-muodossa)</label> <br />
            <input id="fileupload" type="file" onChange={handleFile}></input>
          </Container>
          <Container>
            <label htmlFor="selectVendor">Toimittaja</label>
            <Form.Select className="select-custom" id="selectVendor" onChange={handleVendor}>
              <option>Valitse...</option>
              <option value="ebsco.ini">Ebsco</option>
              <option value="taylorfrancis.ini">Taylor & Francis</option>
              <option value="vlebooks.ini">VLeBooks</option>
            </Form.Select>
          </Container>
          <Container>
            <Button variant="secondary" /*type="submit"*/ onClick={sendFile}>Muunna</Button>
          </Container>
        </Stack>
      </Form>
      <Form>
        <Stack gap={3} className="stack-custom">
          <Container><CustomAlert umSuccess={umSuccess} conversionMessage={conversionMessage}></CustomAlert></Container>
          <Container><MarcList umSuccess={umSuccess} convertedTitles={convertedTitles} postToKoha={postToKoha} checked={checked} setChecked={setChecked}></MarcList></Container>
          <Container><BiblioList kohaSuccess={kohaSuccess} biblionumbers={biblionumbers} convertedTitles={convertedTitles} checked={checked}></BiblioList></Container>
        </Stack>
      </Form>
    </>
  )
}

export default App
