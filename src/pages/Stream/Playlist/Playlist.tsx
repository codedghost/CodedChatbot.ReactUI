import PlaylistHeader from '../../../components/Playlist/Header/PlaylistHeader';
import List from '../../../components/Playlist/List/List';
import UserPlaylistInfo from '../../../models/UserPlaylistInfo';

import { GetUiApiUrl } from '../../../services/UIApiHelperService';

import * as signalR from '@microsoft/signalr';

import PlaylistProps from './PlaylistProps';
import { useEffect, useState } from 'react';

function Playlist(props: PlaylistProps) {
    console.log("Playlistinfo: " + props.UserPlaylistInfo.playlistState)
    const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

    useEffect(() => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(GetUiApiUrl("SongList"))
            .configureLogging(signalR.LogLevel.Information)  
            .build();
    
        hubConnection.start();

        setHubConnection(hubConnection)
    }, [])
    return (
        <div>
            <PlaylistHeader username={props.username} LoginUrl={props.LoginUrl} UserPlaylistInfo={props.UserPlaylistInfo} isModerator={props.isModerator} hubConnection={hubConnection} />

            <List username={props.username} UserPlaylistInfo={props.UserPlaylistInfo} isModerator={props.isModerator} hubConnection={hubConnection} />
        </div>
    )
}

Playlist.defaultProps = {
    username: "",
    LoginUrl: "",
    vips: 0,
    isModerator: false,
    UserPlaylistInfo: {} as UserPlaylistInfo
} as PlaylistProps

export default Playlist;