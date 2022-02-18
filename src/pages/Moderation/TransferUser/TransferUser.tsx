import { useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";

import { ModerationTransferUser } from "../../../services/ModerationService/ModerationService";
import { TransferUserProps } from "../../../services/ModerationService/ModerationServiceInterfaces";

export default function TransferUser() {
    const [transferUserProps, setTransferUserProps] = useState<TransferUserProps>({} as TransferUserProps);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    var handleOldUsernameUpdate = function (e: any) {
        setTransferUserProps({ ...transferUserProps, oldUsername: e.target.value } as TransferUserProps);
    };

    var handleNewUsernameUpdate = function (e: any) {
        setTransferUserProps({ ...transferUserProps, newUsername: e.target.value } as TransferUserProps);
    };

    var sendTransferRequest = function () {
        setLoading(true);
        setSuccess(false);
        ModerationTransferUser(transferUserProps).then((success: boolean) => {
            setLoading(false);
            setSuccess(success);
        });
    };

    var successContent = (
        <>
            <Alert variant="success">User account successfully transferred</Alert>
        </>
    );

    return (
        <>
            <h1>Transfer User Account</h1>
            {errorMessage}
            {success ? successContent : <></>}
            <Form.Group as={Row} className="gap-3" controlId="formTransferUser">
                <Form.Label column xs="12">
                    Old Username:
                </Form.Label>
                <Col xs="12">
                    <Form.Control onChange={handleOldUsernameUpdate} />
                </Col>
                <Form.Label column xs="12">
                    New Username:
                </Form.Label>
                <Col xs="12">
                    <Form.Control onChange={handleNewUsernameUpdate} />
                </Col>
                <Col xs="4">
                    <Button
                        onClick={() => {
                            sendTransferRequest();
                        }}
                    >
                        Transfer
                    </Button>
                </Col>
            </Form.Group>
        </>
    );
}
