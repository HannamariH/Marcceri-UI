import Alert from "react-bootstrap/Alert"

const CustomAlert = ({ umSuccess, conversionMessage }) => {
    if (umSuccess) {
        //return <Alert>Konversion tulos: {conversionMessage}</Alert>
        return (
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Konversion tulos:</h4>
                <p>{conversionMessage}</p>
            </div>
        )
    }
    if (umSuccess === false) {
        return <Alert variant="danger">Tietueiden konvertointi epäonnistui!</Alert>
    }
    return <></>
}

export default CustomAlert