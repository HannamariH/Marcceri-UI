import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const MarcList = ({ postedToKoha, umSuccess, convertedTitles, postToKoha, checked, setChecked, checkedTitles, setCheckedTitles }) => {

    const handleRadioChange = (index) => {
        const updatedChecked = checked.map((item, i) => i === index ? !item : item)
        setChecked(updatedChecked)
        const updatedCheckedTitles = handleCheckedTitles(updatedChecked)
        setCheckedTitles(updatedCheckedTitles)
    }

    const toggleAll = () => {
        const updatedChecked = checked.map((item) => !item)
        setChecked(updatedChecked)
        const updatedCheckedTitles = handleCheckedTitles(updatedChecked)
        setCheckedTitles(updatedCheckedTitles)
    }

    const handleCheckedTitles = (updatedChecked) => {
        let updatedCheckedTitles = []
        for (let i = 0; i < updatedChecked.length; i++) {
            if (updatedChecked[i]) {
                updatedCheckedTitles.push(convertedTitles[i])
            }
        }
        return updatedCheckedTitles
    }

    const handlePostToKoha = () => {
        postToKoha(checkedTitles)
    }

    if (postedToKoha) return <></>

    if (umSuccess) {
        return (
            <>
                <p>Konvertoidut tietueet</p>
                <Form.Check
                    type="checkbox"
                    className="mb-5"
                    label="Vaihda valinnat"
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
                <Button variant="secondary" onClick={() => handlePostToKoha()}>Tallenna valitut Kohaan</Button>
            </>
        )
    }
    return <></>
}

export default MarcList