import { AxiosGet } from "../UIApiHelperService";
import { PlaylistState } from "./PlaylistServiceInterfaces";

export function GetPlaylist(): Promise<PlaylistState> {
    console.log("Get Playlist");
    return AxiosGet<PlaylistState>("Playlist/GetPlaylist")
        .then((response) => {
            return response.data as PlaylistState;
        })
        .catch(() => {
            return {} as PlaylistState;
        });
}
