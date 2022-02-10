import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const MarcList = ({ postedToKoha, umSuccess, convertedTitles, postToKoha, checked, setChecked}) => {

    const handleRadioChange = (index) => {
        const updatedChecked = checked.map((item, i) => i === index ? !item : item)
        setChecked(updatedChecked)
    }
    if (postedToKoha) return <></>

    if (umSuccess) {
        return (
            <>
                <p>Konvertoidut tietueet</p>
                {
                    convertedTitles.map((title, index) =>
                        <Form.Check
                            type="checkbox"
                            id="default-checkbox"
                            className="mb-3"
                            label={title}
                            key={index}
                            defaultChecked
                            onChange={() => handleRadioChange(index)}
                        />
                    )
                }
                <Button variant="secondary" onClick={() => postToKoha(checked)}>Tallenna valitut Kohaan</Button>
            </>
        )
    }
    return <></>
}


export default MarcList