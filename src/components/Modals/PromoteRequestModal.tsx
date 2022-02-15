import { BasicModal } from "./BasicModal";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { RequestOptions, _defaultRequestOptions } from "./RequestOptions";

export function PromoteRequestModal(props: PromoteRequestModalProps) {
    var headerContent = <>Would you like to promote this request using a VIP token?</>;

    var errorMessageContent =
        props.requestOptions.errorMessage.trim() !== "" ? (
            <Alert variant="danger">{props.requestOptions.errorMessage}</Alert>
        ) : (
            <></>
        );

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

    var bodyContent = (
        <>
            {errorMessageContent}
            <Form.Group as={Row} className="gap-2" controlId="formSongName">
                <Col xs="12">Are you sure you wish to promote the following request using a VIP token?</Col>
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
                    Use a VIP or Super VIP?
                </Form.Label>
                <Col xs="12">
                    <Form.Check
                        inline
                        label="Use VIP?"
                        name="vip-radio"
                        type="radio"
                        id="vip-radio"
                        defaultChecked={true}
                        onChange={handleVipUpdateVip}
                    />
                    <Form.Check
                        inline
                        label="Use Super VIP? (50 VIPs)"
                        name="vip-radio"
                        type="radio"
                        id="super-vip-radio"
                        onChange={handleVipUpdateSuperVip}
                    />
                </Col>
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
                Promote Request
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

PromoteRequestModal.defaultProps = {
    show: false,
    changeShow: () => {},
    requestOptions: _defaultRequestOptions,
    updateRequestOptions: (requestOptions: RequestOptions) => {},
    sendRequest: (options: RequestOptions) => {}
} as PromoteRequestModalProps;

export interface PromoteRequestModalProps {
    show: boolean;
    changeShow: () => void;
    requestOptions: RequestOptions;
    updateRequestOptions: (requestOptions: RequestOptions) => void;
    sendRequest: () => void;
}
