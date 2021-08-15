import TwitchAuthBaseModel from '../../../models/TwitchAuthBaseModel';
import UserPlaylistInfo from '../../../models/UserPlaylistInfo';

export default interface PlaylistProps extends TwitchAuthBaseModel {
    LoginUrl: string
    UserPlaylistInfo: UserPlaylistInfo
};