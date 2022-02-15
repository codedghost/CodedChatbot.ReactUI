export interface PlaylistState {
    currentSong: SongRequest;
    regularQueue: Array<SongRequest>;
    vipQueue: Array<SongRequest>;
}

export interface SongRequest {
    songId: number;
    songTitle: string;
    songArtist: string;
    instrument: string;
    requester: string;
    isInDrive: boolean;
    isInChat: boolean;
    isVip: boolean;
    isSuperVip: boolean;
}
