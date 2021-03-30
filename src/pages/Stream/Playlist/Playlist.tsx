import PlaylistHeader from './PlaylistHeader';

import PlaylistProps from './PlaylistProps';

function Playlist(props: PlaylistProps) {

    return (
        <div>
            <PlaylistHeader Username={props.Username} LoginUrl={props.LoginUrl} />
        </div>
    )
}

Playlist.defaultProps = {
    Username: "",
    LoginUrl: ""
} as PlaylistProps

export default Playlist;