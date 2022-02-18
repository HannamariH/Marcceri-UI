import ListGroup from "react-bootstrap/ListGroup"
import Alert from "react-bootstrap/Alert"

const BiblioList = ({ kohaSuccess, biblios, convertedTitles, checked }) => {

    let postedTitles = []

    for (let i = 0; i < convertedTitles.length; i++) {
        if (checked[i]) {
            postedTitles.push(convertedTitles[i])
        }
    }

    if (kohaSuccess === true) {
        return (
                <ListGroup className="pb-5">
                    {
                        biblios.map((biblio) => {
                            const title = biblio.title
                            return (
                                <ListGroup.Item key={biblio.url}>
                                    {title} <a href={biblio.url} target="_blank" rel="noreferrer">{biblio.url}</a>
                                </ListGroup.Item>)
                        })
                    }
                </ListGroup>)
    }
    if (kohaSuccess) {
        return <Alert variant="danger">{kohaSuccess}</Alert>
    }
    return <></>
}

export default BiblioList