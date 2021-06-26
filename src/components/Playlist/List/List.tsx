import { useEffect, useState } from 'react';
import ListProps from './ListProps';
import { AnimateSharedLayout } from "framer-motion";

import { GetUiApiUrl } from '../../../services/UIApiHelperService';
import { PlaylistState } from '../../../services/PlaylistService/PlaylistServiceInterfaces';
import { GetPlaylist } from '../../../services/PlaylistService/PlaylistService';
import SongItem from './SongItem/SongItem';
import PlaylistHeader from './PlaylistHeader/PlaylistHeader';

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
            .withUrl(GetUiApiUrl("SongList"))
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
            <SongItem songRequest={r} {...props} isCurrent={false} isRegular={false} />
    )) : [];

    var regularRequestRender = playlist.regularQueue !== undefined ?  playlist.regularQueue.map((r) => (
            <SongItem songRequest={r} {...props} isCurrent={false} isRegular={true} />
    )) : [];

    var currentSongRender = playlist.currentSong !== undefined ? 
        <SongItem songRequest={playlist.currentSong} {...props} isCurrent={true} isRegular={false} /> : (<></>)

    return (
        <div>
            <AnimateSharedLayout>
                <div className="current">
                    <PlaylistHeader HeaderText="Current Song" />
                    <div className="song-container">
                        {currentSongRender}
                    </div>
                </div>
                
                <div className="row lists-container">
                    <div className="col-6 vip-container">
                        <PlaylistHeader HeaderText="VIP Song Requests" />
                        <div className="queue-container">
                            {vipRequestRender}
                        </div>
                    </div>
                    <div className="col-6 regular-container">
                        <PlaylistHeader HeaderText="Song Requests" />
                        <div className="queue-container">
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