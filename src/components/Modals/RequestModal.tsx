import { BasicModal } from "./BasicModal";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";

import { RequestOptions, _defaultRequestOptions } from "./RequestOptions";

export function RequestModal(props: RequestModalProps) {
    var handleSongNameUpdate = function (e: any) {
        props.updateRequestOptions({
            ...props.requestOptions,
            songName: e.target.value
        } as RequestOptions);
    };

    var handleArtistNameUpdate = function (e: any) {
        props.updateRequestOptions({
            ...props.requestOptions,
            artistName: e.target.value
        } as RequestOptions);
    };

    var handleInstrumentUpdate = function (e: any) {
        props.updateRequestOptions({
            ...props.requestOptions,
            instrument: e.target.value
        } as RequestOptions);
    };

    var handleVipUpdateRegular = function (e: any) {
        props.updateRequestOptions({
            ...props.requestOptions,
            useVipToken: false,
            useSuperVipToken: false
        });
    };

    var handleVipUpdateVip = function (e: any) {
        props.updateRequestOptions({
            ...props.requestOptions,
            useVipToken: true,
            useSuperVipToken: false
        });
    };

    var handleVipUpdateSuperVip = function (e: any) {
        props.updateRequestOptions({
            ...props.requestOptions,
            useVipToken: false,
            useSuperVipToken: true
        });
    };

    var headerContent = <>{props.isAddRequest ? <>Request a song</> : <>Edit your request</>}</>;

    var errorMessageContent =
        props.requestOptions.errorMessage.trim() !== "" ? (
            <Alert variant="danger">{props.requestOptions.errorMessage}</Alert>
        ) : (
            <></>
        );

    var bodyContent = (
        <>
            {errorMessageContent}
            <Form.Group as={Row} className="gap-3" controlId="formSongName">
                <Form.Label column xs="4">
                    Song Name:
                </Form.Label>
                <Col xs="6">
                    <Form.Control defaultValue={props.requestOptions.songName} onChange={handleSongNameUpdate} />
                </Col>
                <Form.Label column xs="4">
                    Artist Name:
                </Form.Label>
                <Col xs="6">
                    <Form.Control defaultValue={props.requestOptions.artistName} onChange={handleArtistNameUpdate} />
                </Col>
                <Form.Label column xs="4">
                    Instrument:
                </Form.Label>
                <Col xs="6">
                    <Form.Select defaultValue={props.requestOptions.instrument} onChange={handleInstrumentUpdate}>
                        <option value="guitar">Guitar</option>
                        <option value="bass">Bass</option>
                    </Form.Select>
                </Col>
                {props.isAddRequest ? (
                    <Col xs="12">
                        <Form.Check
                            inline
                            label="Regular"
                            name="vip-radio"
                            type="radio"
                            id="reqular-radio"
                            defaultChecked={true}
                            onChange={handleVipUpdateRegular}
                        />
                        <Form.Check
                            inline
                            label="Use Vip?"
                            name="vip-radio"
                            type="radio"
                            id="vip-radio"
                            onChange={handleVipUpdateVip}
                        />
                        <Form.Check
                            inline
                            label="Use Super Vip?"
                            name="vip-radio"
                            type="radio"
                            id="super-vip-radio"
                            onChange={handleVipUpdateSuperVip}
                        />
                    </Col>
                ) : (
                    <></>
                )}
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
                Request
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

RequestModal.defaultProps = {
    show: false,
    changeShow: () => {},
    requestOptions: _defaultRequestOptions,
    updateRequestOptions: (requestOptions: RequestOptions) => {},
    sendRequest: (options: RequestOptions) => {},
    isAddRequest: true
};

export interface RequestModalProps {
    show: boolean;
    changeShow: () => void;
    requestOptions: RequestOptions;
    updateRequestOptions: (requestOptions: RequestOptions) => void;
    sendRequest: () => void;
    isAddRequest: boolean;
}
