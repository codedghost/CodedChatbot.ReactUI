import TwitchAuthBaseModel from '../../../models/TwitchAuthBaseModel'

export default interface PlaylistHeaderProps extends TwitchAuthBaseModel {
    LoginUrl: string,
}