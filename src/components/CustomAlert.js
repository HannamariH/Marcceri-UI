import Alert from "react-bootstrap/Alert"

const CustomAlert = ({ umSuccess, conversionMessage }) => {
    if (umSuccess) {
        return (
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Konversion tulos:</h4>
                <p>{conversionMessage}</p>
            </div>
        )
    }
    if (umSuccess === false) {
        return <Alert variant="danger">Tietueiden konvertointi epäonnistui! Tarkista, että tiedosto on validia marc- tai marcxml-muotoa.</Alert>
    }
    return <></>
}

export default CustomAlert