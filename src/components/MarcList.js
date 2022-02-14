import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const MarcList = ({ postedToKoha, umSuccess, convertedTitles, postToKoha, checked, setChecked}) => {

    const handleRadioChange = (index) => {
        const updatedChecked = checked.map((item, i) => i === index ? !item : item)
        setChecked(updatedChecked)
    }

    const toggleAll = () => {
        const updatedChecked = checked.map((item) => !item)
        setChecked(updatedChecked)
    }
    if (postedToKoha) return <></>

    if (umSuccess) {
        return (
            <>
                <p>Konvertoidut tietueet</p>
                <Form.Check
                            type="checkbox"
                            className="mb-5"
                            label="Valitse kaikki"
                            key="toggle"
                            defaultChecked
                            onChange={() => toggleAll()}
                        />
                {
                    convertedTitles.map((title, index) =>
                        <Form.Check
                            type="checkbox"
                            className="mb-3"
                            label={title}
                            key={index}
                            checked={checked[index]}
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