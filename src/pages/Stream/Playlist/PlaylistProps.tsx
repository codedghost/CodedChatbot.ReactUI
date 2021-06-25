import TwitchAuthBaseModel from '../../../models/TwitchAuthBaseModel';

export default interface PlaylistProps extends TwitchAuthBaseModel {
    LoginUrl: string
};