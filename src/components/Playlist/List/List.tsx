import { useEffect, useState } from 'react';
import ListProps from './ListProps';
import { AnimateSharedLayout } from "framer-motion";

import { PlaylistState } from '../../../services/PlaylistService/PlaylistServiceInterfaces';
import { GetPlaylist } from '../../../services/PlaylistService/PlaylistService';
import SongItem from './SongItem/SongItem';

import * as signalR from "@microsoft/signalr";

import './List.scss';

function List(props: ListProps) {
    const [playlist, updatePlaylist] = useState<PlaylistState>({} as PlaylistState);

    useEffect(() => {
        // Get initial Playlist State
        GetPlaylist().then((data) => {
            updatePlaylist({...data} as PlaylistState);
        });
    
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:49420/SongList")
            .configureLogging(signalR.LogLevel.Information)  
            .build();
    
        hubConnection.start();
    
        hubConnection.on("UpdateClients", (currentSong, regularQueue, vipQueue) => {
            console.log(currentSong);
            var playlistState = {currentSong: currentSong, regularQueue: regularQueue, vipQueue: vipQueue} as PlaylistState;
    
            updatePlaylist(playlistState);
        });
    }, []);

    var vipRequestRender = playlist.vipQueue !== undefined ? playlist.vipQueue.map((r) => (
        <div className="song-container">
            <SongItem songRequest={r} {...props} isCurrent={false} isRegular={false} />
        </div>
    )) : [];

    var regularRequestRender = playlist.regularQueue !== undefined ?  playlist.regularQueue.map((r) => (
            <SongItem songRequest={r} {...props} isCurrent={false} isRegular={true} />
    )) : [];

    return (
        <div>
            <AnimateSharedLayout>
                <div className="current">
                    <div className="header">
                        <b>Current Song</b>
                    </div>
                    <div className="song-container">
                        <SongItem songRequest={playlist.currentSong} {...props} isCurrent={true} isRegular={false} />
                    </div>
                </div>
                
                <div className="lists-container">
                    <div className="vip-container">
                        <div className="header">
                            <b>VIP Song Requests</b>
                        </div>
                        <div className="queue-container">
                            {vipRequestRender}
                        </div>
                    </div>
                    <div className="regular-container">
                        <div className="header">
                            <b>Song Requests</b>
                        </div>
                        <div className="queue-contaimer">
                            {regularRequestRender}
                        </div>
                    </div>
                </div>
            </AnimateSharedLayout>
            <pre >{JSON.stringify(playlist, null, 2)}</pre>
        </div>
    )
}

List.defaultProps = {
    username: '',
    isModerator: false,
    vips: 0
} as ListProps

export default List;