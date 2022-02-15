import { BasicModal } from "./BasicModal";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import PlaylistStateEnum from "../../models/PlaylistStateEnum";

export function ChangePlaylistStateModal(props: ChangePlaylistStateProps) {
    const [selectedUpdateState, setSelectedUpdateState] = useState<string>("0");

    var handlePlaylistStateUpdate = function (e: any) {
        setSelectedUpdateState(e.target.value);
    };

    var headerContent = <>Please choose an option below</>;

    var errorMessageContent =
        props.errorMessage.trim() !== "" ? <Alert variant="danger">{props.errorMessage}</Alert> : <></>;

    var stateSelectItems = [];

    for (let state in PlaylistStateEnum) {
        if (!isNaN(Number(state))) {
            stateSelectItems.push(<option value={state}>{PlaylistStateEnum[state]}</option>);
        }
    }

    var bodyContent = (
        <>
            {errorMessageContent}
            <Form.Group as={Row} className="gap-3" controlId="formChangePlaylist">
                <Form.Label column xs="4">
                    Current State:
                </Form.Label>
                <Form.Label column xs="6">
                    {props.currentState}
                </Form.Label>
                <Form.Label column xs="4">
                    New State:
                </Form.Label>
                <Col xs="6">
                    <Form.Select defaultValue="0" onChange={handlePlaylistStateUpdate}>
                        {stateSelectItems}
                    </Form.Select>
                </Col>
            </Form.Group>
        </>
    );

    var footerContent = (
        <>
            <Button
                onClick={() => {
                    props.updatePlaylistState(selectedUpdateState);
                }}
            >
                Update
            </Button>
            <Button
                onClick={() => {
                    props.changeShow();
                }}
            >
                Cancel
            </Button>
        </>
    );
    return (
        <>
            <BasicModal
                show={props.show}
                changeShow={props.changeShow}
                showCloseButton={true}
                headerContent={headerContent}
                bodyContent={bodyContent}
                footerContent={footerContent}
            />
        </>
    );
}

ChangePlaylistStateModal.defaultProps = {
    updatePlaylistState: (playlistType: string) => {},
    changeShow: () => {},
    errorMessage: "",
    show: false,
    currentState: 0
};

export interface ChangePlaylistStateProps {
    updatePlaylistState: (playlistType: string) => void;
    changeShow: () => void;
    errorMessage: string;
    show: boolean;
    currentState: string;
}
