import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import debounce from "lodash.debounce";

import { ModerationSongSearch } from "../../../services/ModerationService/ModerationService";
import { SongSearchProps, SongSearchResult } from "../../../services/ModerationService/ModerationServiceInterfaces";

import { SearchProps, _defaultSongSearchProps } from "./SearchProps";

function Search(props: SearchProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [searchProps, setSearchProps] = useState<SongSearchProps>(_defaultSongSearchProps);

    const [searchResults, setSearchResults] = useState<SongSearchResult[]>([]);

    var handleSongNameUpdate = function (e: any) {
        setSearchProps({ ...searchProps, songName: e.target.value });
    };

    var handleArtistNameUpdate = function (e: any) {
        setSearchProps({ ...searchProps, artistName: e.target.value });
    };

    useEffect(() => {
        debouncedSearch(searchProps);
    }, [searchProps]);

    var search = function (props: SongSearchProps) {
        console.log(`${props.songName} - ${props.artistName}`);
        if (props.songName.length > 3 || props.artistName.length > 3) {
            ModerationSongSearch(props).then((result) => {
                console.log(result);
                setSearchResults(result);
            });
        } else {
            setSearchResults([]);
        }
    };

    var debouncedSearch = useCallback(
        debounce((props: SongSearchProps) => search(props), 500),
        []
    );

    var searchResultContent = searchResults.map((s) => (
        <Row>
            <Col xs="6">
                {s.songName} - {s.songArtist} - Charted by: {s.charterUsername}
            </Col>
            <Col xs="4">
                <Button>Download To Drive</Button>
            </Col>
        </Row>
    ));

    return (
        <>
            <h1>Song Search</h1>
            {errorMessage}
            <Form.Group as={Row} className="gap-3" controlId="formSongSearch">
                <Form.Label column xs="12">
                    Please enter the song name:
                </Form.Label>
                <Col xs="12">
                    <Form.Control defaultValue={searchProps.songName} onChange={handleSongNameUpdate} />
                </Col>
                <Form.Label column xs="12">
                    Please enter the artist name:
                </Form.Label>
                <Col xs="12">
                    <Form.Control defaultValue={searchProps.artistName} onChange={handleArtistNameUpdate} />
                </Col>
            </Form.Group>
            {searchResultContent}
        </>
    );
}

Search.defaultProps = {
    username: "",
    isModerator: false
};

export default Search;
