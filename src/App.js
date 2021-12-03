import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import React, { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [file, setFile] = useState()
  const [vendor, setVendor] = useState()

  const handleFile = (event) => {
    //TODO: check if file is in right format! (xml, joku marc-formaatti?, zip)
    setFile(event.target.files[0])
    console.log(event.target.files[0].name)
  }

  const handleVendor = (event) => {
    setVendor(event.target.value)
    console.log(event.target.value)
  }

  const sendFile = () => {
    if (file === undefined) {
      console.log("choose a file first")
    } else {
      //TODO: axios post
      setFile()
      setVendor()
      //TODO: miten tyhjennetään tiedoston nimi fileuploadista?
      console.log("File sent!")      
    }
  }

  return (
    <>
      <Navbar className="navbar-custom"><Container><h1>Marc-muuntaja</h1></Container></Navbar>
      <Form>
        <Stack gap={3} className="stack-custom">
        <Container>
          <label htmlFor="fileupload">Marc-tiedosto</label> <br />
          <input id="fileupload" type="file" onChange={handleFile}></input>
        </Container>
        <Container>
          <label htmlFor="selectVendor">Toimittaja</label>
          <Form.Select className="select-custom" id="selectVendor" onChange={handleVendor}>
            <option>Valitse...</option>
            <option value="1">Ebsco</option>
            <option value="2">Taylor & Francis</option>
            <option value="3">VLeBooks</option>
          </Form.Select>
        </Container>
        <Container>
          <Button variant="secondary" onClick={sendFile}>Muunna</Button>
        </Container>
        </Stack>
      </Form>
    </>
  )
}

export default App
