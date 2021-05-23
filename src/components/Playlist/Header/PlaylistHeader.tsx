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
            Welcome {props.username}! {props.isModerator ? "You are a moderator, gg!" : ""} You have {props.vips} VIP tokens!
        </div>
    )

    return (
        <Alert key="playlist-header" variant="dark">
            {props.username === "" ? loggedOutContent : loggedInContent}
        </Alert>
    );
}

PlaylistHeader.defaultProps = {
    username: "",
    LoginUrl: "#",
    vips: 0
} as PlaylistHeaderProps;

export default PlaylistHeader;