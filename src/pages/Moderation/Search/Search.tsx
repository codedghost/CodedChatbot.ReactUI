import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { SearchProps, SongSearchProps, _defaultSongSearchProps } from "./SearchProps";

function Search(props: SearchProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [searchProps, setSearchProps] = useState<SongSearchProps>(_defaultSongSearchProps);

    var handleSongNameUpdate = function (e: any) {
        setSearchProps({ ...searchProps, songName: e.target.value });
    };

    var handleArtistNameUpdate = function (e: any) {
        setSearchProps({ ...searchProps, artistName: e.target.value });
    };

    var search = function () {
        if (searchProps.songName.length > 3 || searchProps.artistName.length > 3) {
            console.log(`Send search for Song: ${searchProps.songName}, Artist: ${searchProps.artistName}`);
        }
    };

    useEffect(() => {
        search();
    }, [searchProps]);

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
        </>
    );
}

Search.defaultProps = {
    username: "",
    isModerator: false
};

export default Search;
