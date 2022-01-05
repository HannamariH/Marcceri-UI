import ListGroup from "react-bootstrap/ListGroup"

const BiblioList = ({ kohaSuccess }) => {
    //TODO: tälle tieto todellisista biblioista ja niiden mappaus listaksi
    if (kohaSuccess) {
        return <ListGroup>
        <ListGroup.Item>
            Eka biblio <a href="https://app1.jyu.koha.csc.fi/cgi-bin/koha/mainpage.pl">Linkki Kohaan</a>
        </ListGroup.Item>
        <ListGroup.Item>
            Toka biblio <a href="https://app1.jyu.koha.csc.fi/cgi-bin/koha/mainpage.pl">Linkki Kohaan</a>
        </ListGroup.Item>
        <ListGroup.Item>
            Kolmas biblio <a href="https://app1.jyu.koha.csc.fi/cgi-bin/koha/mainpage.pl">Linkki Kohaan</a>
        </ListGroup.Item>
    </ListGroup>
    }
    return <></>
    
}

export default BiblioList