import { BasicModal } from "./BasicModal";
import { Alert, Button } from "react-bootstrap";

export function SendEmptyPlaylistModal(props: SendEmptyPlaylistProps) {
    var headerContent = <>Would you like to empty the playlist?</>;

    var errorMessageContent =
        props.errorMessage.trim() !== "" ? <Alert variant="danger">{props.errorMessage}</Alert> : <></>;

    var bodyContent = (
        <>
            {errorMessageContent}
            Are you certain you would like to empty the entire playlist? You cannot undo this action.
        </>
    );

    var footerContent = (
        <>
            <Button
                onClick={() => {
                    props.sendEmpty();
                }}
            >
                Empty
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

SendEmptyPlaylistModal.defaultProps = {
    sendEmpty: () => {},
    changeShow: () => {},
    errorMessage: "",
    show: false
};

export interface SendEmptyPlaylistProps {
    sendEmpty: () => void;
    changeShow: () => void;
    errorMessage: string;
    show: boolean;
}
