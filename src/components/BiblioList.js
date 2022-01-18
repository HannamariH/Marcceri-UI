import ListGroup from "react-bootstrap/ListGroup"

const BiblioList = ({ kohaSuccess, biblionumbers, convertedTitles, checked }) => {

    let postedTitles = []

    for (let i = 0; i < convertedTitles.length; i++) {
        if (checked[i]) {
            postedTitles.push(convertedTitles[i])
        }
    }

    if (kohaSuccess) {
        return (
            <div>
                <p>Seuraavat tietueet tallennettu Kohaan:</p>
                <ListGroup className="pb-5">
                    {
                        biblionumbers.map((biblionumber, index) => {

                            const title = postedTitles[index]

                            return (
                                <ListGroup.Item key={biblionumber}>
                                    {title} <a href={`https://app1.jyu.koha.csc.fi/cgi-bin/koha/catalogue/detail.pl?biblionumber=${biblionumber}`} target="_blank" rel="noreferrer">{`https://app1.jyu.koha.csc.fi/cgi-bin/koha/catalogue/detail.pl?biblionumber=${biblionumber}`}</a>
                                </ListGroup.Item>)
                        })
                    }
                </ListGroup></div>)
    }
    return <></>

}

export default BiblioList