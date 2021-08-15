import TwitchAuthBaseModel from '../../../models/TwitchAuthBaseModel';
import UserPlaylistInfo from '../../../models/UserPlaylistInfo';

export default interface ListProps extends TwitchAuthBaseModel {
    UserPlaylistInfo: UserPlaylistInfo,
    hubConnection: signalR.HubConnection
}