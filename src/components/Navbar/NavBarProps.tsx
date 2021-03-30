export default interface NavBarProps {
    CurrentUsername: string,
    LoginUrl: string,
    SetUsernameCallback: (username: string) => void;
    SetLoginUrlCallback: (url: string) => void;
}