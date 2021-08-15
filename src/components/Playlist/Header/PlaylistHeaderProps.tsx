import TwitchAuthBaseModel from '../../../models/TwitchAuthBaseModel'
import UserPlaylistInfo from '../../../models/UserPlaylistInfo'

export default interface PlaylistHeaderProps extends TwitchAuthBaseModel {
    LoginUrl: string,
    UserPlaylistInfo: UserPlaylistInfo,
    hubConnection: signalR.HubConnection
}