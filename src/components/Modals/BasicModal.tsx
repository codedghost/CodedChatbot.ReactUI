import { ReactElement } from 'react';
import {Modal} from 'react-bootstrap';
import { JsxElement } from 'typescript';

export function BasicModal(props: BasicModalProps) {
    return (
        <Modal show={props.show} onHide={() => {props.changeShow()}} size="lg" centered>
            <Modal.Header closeButton={props.showCloseButton}>
                <Modal.Title>{props.headerContent}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.bodyContent}</Modal.Body>
            <Modal.Footer>{props.footerContent}</Modal.Footer>
        </Modal>
    );
}

export interface BasicModalProps {
    show: boolean,
    changeShow: () => void,
    showCloseButton: boolean,
    headerContent: ReactElement,
    bodyContent: ReactElement,
    footerContent: ReactElement
}

BasicModal.defaultProps = {
    show: false,
    changeShow: () => {},
    showCloseButton: true,
    headerContent: (<></>),
    bodyContent: (<></>),
    footerContent: (<></>)
} as BasicModalProps