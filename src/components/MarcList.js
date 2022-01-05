import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"


const MarcList = ({ umSuccess, convertedTitles, postToKoha }) => {

    if (umSuccess) {
        return (
            <>
                <p>Konvertoidut tietueet</p>
                {
                    convertedTitles.map(title =>
                        <Form.Check
                            type="checkbox"
                            id="default-checkbox"
                            className="mb-3"
                            label={title}
                            key={title}
                            defaultChecked
                        />
                    )
                }
                <Button variant="secondary" /*type="submit"*/ onClick={postToKoha}>Tallenna valitut Kohaan</Button>
            </>
        )
    }
    return <></>
}


export default MarcList