import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"

const UploadForm = ({ handleFile, handleVendor, sendFile }) => {
    return (
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
                    <Button variant="secondary" onClick={sendFile}>Muunna</Button>
                </Container>
            </Stack>
        </Form>
    )
} 

export default UploadForm