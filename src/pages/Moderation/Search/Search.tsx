import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import debounce from "lodash.debounce";

import { DownloadToDrive, ModerationSongSearch } from "../../../services/ModerationService/ModerationService";
import {
    SongSearchProps,
    SongSearchResult,
    _defaultSongSearchProps
} from "../../../services/ModerationService/ModerationServiceInterfaces";

import { SearchProps } from "./SearchProps";

function Search(props: SearchProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [defaultContent, setDefaultContent] = useState<string>("Enter search terms longer than three characters to initiate search.");

    const [searchProps, setSearchProps] = useState<SongSearchProps>(_defaultSongSearchProps);

    const [searchResultsContent, setSearchResultsContent] = useState<JSX.Element[]>([]);
    const [searchResults, setSearchResults] = useState<SongSearchUIResult[]>([]);

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
        if (props.songName.length > 3 || props.artistName.length > 3) {
            ModerationSongSearch(props).then((result) => {
                setSearchResults(
                    result.map(
                        (s) => ({ ...s, disableButton: false, mainText: "Download to Drive" } as SongSearchUIResult)
                    )
                );
                setDefaultContent("");
            });
            setDefaultContent("Searching...");
        } else {
            setDefaultContent("Enter search terms longer than three characters to initiate search.");
            setSearchResults([]);
        }
    };

    useEffect(() => {
        setSearchResultsContent(searchResults.map((s) => actionButtonMap(s)));
    }, [searchResults]);

    var officialSongButton = <Button variant="danger">Official Song</Button>;
    var deadLinkButton = <Button variant="secondary">Cannot Download</Button>;
    var alreadyDownloadedButton = <Button variant="warning">Already downloaded</Button>;

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };

    var actionButtonMap = function (s: SongSearchUIResult): JSX.Element {
        return (
            <Row key={s.songId}>
                <Col xs="6">
                    {decodeURIComponent(s.songName)} - {s.songArtist} - Charted by: {s.charterUsername}
                </Col>
                <Col xs="3">
                    {s.isOfficial ? (
                        officialSongButton
                    ) : s.isLinkDead ? (
                        deadLinkButton
                    ) : s.isDownloaded ? (
                        alreadyDownloadedButton
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => (s.disableButton ? () => {} : handleDownloadSongEvent(s))}
                            disabled={s.disableButton}
                        >
                            {s.mainText}
                        </Button>
                    )}
                </Col>
                <Col xs="3">
                    <Button 
                        variant="primary"
                        onClick={() => openInNewTab(s.downloadUrl)}
                        >Open Download Link</Button>
                </Col>
            </Row>
        );
    };

    var debouncedSearch = useCallback(
        debounce((props: SongSearchProps) => search(props), 500),
        []
    );

    var handleDownloadSongEvent = function (songSearchUIResult: SongSearchResult) {
        var thisIndex = searchResults.findIndex((val) => val.songId === songSearchUIResult.songId);

        var editedSongResult = searchResults[thisIndex];

        setSearchResults(
            searchResults.map((s) =>
                s.songId === editedSongResult.songId
                    ? ({ ...s, disableButton: true, mainText: "Sending..." } as SongSearchUIResult)
                    : s
            )
        );

        DownloadToDrive(songSearchUIResult.songId).then((result) => {
            console.log(result);
            console.log(editedSongResult.songId);
            setSearchResults(
                searchResults.map((s) =>
                    s.songId === editedSongResult.songId
                        ? ({
                              ...s,
                              disableButton: result,
                              mainText: result ? "Request Sent" : "Error sending request"
                          } as SongSearchUIResult)
                        : s
                )
            );
        });
    };

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
            <br />
            <Row className="gap-3">{defaultContent}</Row>
            <Row className="gap-3">{searchResultsContent}</Row>
        </>
    );
}

Search.defaultProps = {
    username: "",
    isModerator: false
};

export default Search;

interface SongSearchUIResult {
    songId: number;
    songName: string;
    charterUsername: string;
    songArtist: string;
    isOfficial: boolean;
    isDownloaded: boolean;
    isLinkDead: boolean;
    disableButton: boolean;
    mainText: string;
    downloadUrl: string
}
