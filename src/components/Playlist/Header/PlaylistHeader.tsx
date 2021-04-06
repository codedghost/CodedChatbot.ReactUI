import {Alert} from 'react-bootstrap';

import PlaylistHeaderProps from './PlaylistHeaderProps';

function PlaylistHeader(props: PlaylistHeaderProps) {

    const loggedOutContent = (
        <div>
            <Alert.Link href={props.LoginUrl}>Login</Alert.Link> with Twitch to access playlist features!
        </div>
    );

    const loggedInContent = (
        <div>
            Welcome {props.Username}!
        </div>
    )

    return (
        <Alert key="playlist-header" variant="dark">
            {props.Username === "" ? loggedOutContent : loggedInContent}
        </Alert>
    );
}

PlaylistHeader.defaultProps = {
    Username: "",
    LoginUrl: "#"
} as PlaylistHeaderProps;

export default PlaylistHeader;