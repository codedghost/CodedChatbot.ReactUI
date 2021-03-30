import TwitchEmbed from '../../../components/TwitchEmbed/TwitchEmbed';
import Config from '../../../services/Config/Config';

import {Container, Row} from 'react-bootstrap';


function Info() {
    return (
        <Container>
            <Row className="justify-content-center">
                <TwitchEmbed targetId="twitch-home-embed" height="480" width="940" channel={Config.ChannelName}></TwitchEmbed>
            </Row>
        </Container>
    );
}

export default Info