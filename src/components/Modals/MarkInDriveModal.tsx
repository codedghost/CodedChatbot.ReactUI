import { BasicModal } from "./BasicModal";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { RequestOptions, _defaultRequestOptions } from "./RequestOptions";

export function MarkInDriveModal(props: MarkInDriveModalProps) {
    var headerContent = <>Would you like to mark this request as "in the drive"?</>;

    var errorMessageContent =
        props.requestOptions.errorMessage.trim() !== "" ? (
            <Alert variant="danger">{props.requestOptions.errorMessage}</Alert>
        ) : (
            <></>
        );

    var bodyContent = (
        <>
            {errorMessageContent}
            <Form.Group as={Row} className="gap-2" controlId="formSongName">
                <Col xs="12">Are you sure you wish to mark the following request as "in the drive"?</Col>
                <Form.Label column xs="4">
                    Song Name:
                </Form.Label>
                <Form.Label column xs="6">
                    {props.requestOptions.songName}
                </Form.Label>
                <Form.Label column xs="4">
                    Artist Name:
                </Form.Label>
                <Form.Label column xs="6">
                    {props.requestOptions.artistName}
                </Form.Label>
                <Form.Label column xs="4">
                    Instrument:
                </Form.Label>
                <Form.Label column xs="6">
                    {props.requestOptions.instrument}
                </Form.Label>
                <Form.Label column xs="4">
                    Request Tier:
                </Form.Label>
                <Form.Label column xs="6">
                    {props.requestOptions.useVipToken
                        ? "VIP Request"
                        : props.requestOptions.useSuperVipToken
                        ? "Super VIP Request"
                        : "Regular Request"}
                </Form.Label>
            </Form.Group>
        </>
    );

    var footerContent = (
        <>
            <Button
                onClick={() => {
                    props.sendRequest();
                }}
            >
                Mark In Drive
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
        <BasicModal
            show={props.show}
            changeShow={props.changeShow}
            showCloseButton={true}
            headerContent={headerContent}
            bodyContent={bodyContent}
            footerContent={footerContent}
        />
    );
}

MarkInDriveModal.defaultProps = {
    show: false,
    changeShow: () => {},
    requestOptions: _defaultRequestOptions,
    sendRequest: (options: RequestOptions) => {}
} as MarkInDriveModalProps;

export interface MarkInDriveModalProps {
    show: boolean;
    changeShow: () => void;
    requestOptions: RequestOptions;
    sendRequest: () => void;
}
