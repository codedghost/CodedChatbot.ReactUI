import TwitchAuthBaseModel from '../../models/TwitchAuthBaseModel';

export default interface NavBarProps {
    AuthBaseModel: TwitchAuthBaseModel,
    LoginUrl: string,
    SetLoginUrlCallback: (url: string) => void;
    SetAuthModelCallback: (authBaseModel: TwitchAuthBaseModel) => void;
}