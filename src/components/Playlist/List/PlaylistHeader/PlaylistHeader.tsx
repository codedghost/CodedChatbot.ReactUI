import { Card } from 'react-bootstrap';
import PlaylistHeaderProps from './PlaylistHeaderProps';

export default function PlaylistHeader(props: PlaylistHeaderProps) {
    return (
        <div className="d-flex justify-content-center header col-12">
            <Card
                body
                bg="secondary"
                text="light">
                    <b>{props.HeaderText}</b>
                </Card>
            
        </div>
    )
}

PlaylistHeader.defaultProps = {
    HeaderText: ""
} as PlaylistHeaderProps