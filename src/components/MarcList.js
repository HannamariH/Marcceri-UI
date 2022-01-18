import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useEffect, useState } from 'react'


const MarcList = ({ umSuccess, convertedTitles, postToKoha }) => {

    const [checked, setChecked] = useState([])

    useEffect(() => {
        setChecked(new Array(convertedTitles.length).fill(true))
    }, [convertedTitles])

    const handleRadioChange = (index) => {
        const updatedChecked = checked.map((item, i) => i === index ? !item : item)
        setChecked(updatedChecked)
    }

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
                <Button variant="secondary" /*type="submit"*/ onClick={() => postToKoha(checked)}>Tallenna valitut Kohaan</Button>
            </>
        )
    }
    return <></>
}


export default MarcList