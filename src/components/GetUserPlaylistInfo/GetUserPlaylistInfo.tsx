import GetUserPlaylistInfoProps from "./GetUserPlaylistInfoProps";

import { useEffect } from "react";

import { RetrieveUserPlaylistInfo } from "../../services/PlaylistService/PlaylistService";

function GetUserPlaylistInfo(props: GetUserPlaylistInfoProps) {
    useEffect(() => {
        RetrieveUserPlaylistInfo().then((userPlaylistInfo) => {
            props.SetUserPlaylistInfoCallback(userPlaylistInfo);
        });
    }, []);

    return <></>;
}

GetUserPlaylistInfo.defaultProps = {
    SetUserPlaylistInfoCallback: (userPlaylistInfo) => {}
} as GetUserPlaylistInfoProps;

export default GetUserPlaylistInfo;
