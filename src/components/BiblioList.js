import ListGroup from "react-bootstrap/ListGroup"

const BiblioList = ({ kohaSuccess, biblionumbers }) => {
    //TODO: tälle tieto todellisista biblioista ja niiden mappaus listaksi
    if (kohaSuccess) {
        return <ListGroup>
            <p>Seuraavat tietueet tallennettu Kohaan</p>
            {                
                biblionumbers.map(biblionumber => 
                    <ListGroup.Item>
                        <a href={`https://app1.jyu.koha.csc.fi/cgi-bin/koha/catalogue/detail.pl?biblionumber=${biblionumber}`}>Linkki Kohaan</a>
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    }
    return <></>

}

export default BiblioList