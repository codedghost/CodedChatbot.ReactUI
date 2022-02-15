import UserPlaylistInfo from "../../models/UserPlaylistInfo";

export default interface GetUserPlaylistInfoProps {
    SetUserPlaylistInfoCallback: (userPlaylistInfo: UserPlaylistInfo) => void;
}
