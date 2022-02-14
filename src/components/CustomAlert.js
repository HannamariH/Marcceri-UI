import Alert from "react-bootstrap/Alert"

const CustomAlert = ({ authorized, apiError, conversionError, postedToKoha, kohaSuccess, marcSent, umSuccess, conversionMessage }) => {

    if (apiError) {
        return <Alert variant="danger">Virhe Marccerin toiminnassa.</Alert>
    }
    if (!authorized && !apiError) {
        return <Alert variant="danger">Sinulla ei ole oikeutta Marccerin käyttöön.</Alert>
    }
    if (marcSent && umSuccess === undefined) {
        return <Alert variant="info">Tietueiden konvertointi käynnissä...</Alert>
    }
    if (kohaSuccess) {
        return <Alert variant="success">Seuraavat tietueet tallennettu Kohaan:</Alert>
    }
    if (postedToKoha && !kohaSuccess) {
        return <Alert variant="info">Tietueiden tallennus Kohaan käynnissä...</Alert>
    }    
    if (postedToKoha) return <></>
    if (umSuccess && conversionError.length !== 0) {
        return (
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Konversion tulos sisältää virheitä:</h4>
                <p>{conversionMessage}</p>
            </div>
        )
    }
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