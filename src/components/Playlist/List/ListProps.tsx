export interface ListProps {
    currentSong: SongRequest,
    regularQueue: Array<SongRequest>,
    vipQueue: Array<SongRequest>
}

export interface SongRequest {
    songId: number,
    songTitle: string,
    songArtist: string,
    requester: string,
}