
export interface SongSearchResult {
    songId: number;
    songName: string;
    charterUsername: string;
    songArtist: string;
    isOfficial: boolean;
    isDownloaded: boolean;
    isLinkDead: boolean;
}

export interface SongSearchProps {
    songName: string;
    artistName: string;
}

export const _defaultSongSearchProps = {
    songName: "",
    artistName: ""
} as SongSearchProps;

