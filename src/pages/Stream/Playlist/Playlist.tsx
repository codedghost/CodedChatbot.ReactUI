import PlaylistHeader from '../../../components/Playlist/Header/PlaylistHeader';
import List from '../../../components/Playlist/List/List';

import PlaylistProps from './PlaylistProps';

function Playlist(props: PlaylistProps) {

    return (
        <div>
            <PlaylistHeader username={props.username} LoginUrl={props.LoginUrl} vips={props.vips} isModerator={props.isModerator} />

            <List username={props.username} vips={props.vips} isModerator={props.isModerator} />
        </div>
    )
}

Playlist.defaultProps = {
    username: "",
    LoginUrl: "",
    vips: 0,
    isModerator: false
} as PlaylistProps

export default Playlist;