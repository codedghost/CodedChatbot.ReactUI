import PlaylistHeader from '../../../components/Playlist/Header/PlaylistHeader';
import List from '../../../components/Playlist/List/List';
import Test from '../../../components/Test/Test';

import PlaylistProps from './PlaylistProps';

function Playlist(props: PlaylistProps) {

    return (
        <div>
            <PlaylistHeader Username={props.Username} LoginUrl={props.LoginUrl} />

            <Test />
        </div>
    )
}

Playlist.defaultProps = {
    Username: "",
    LoginUrl: ""
} as PlaylistProps

export default Playlist;