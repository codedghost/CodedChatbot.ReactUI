import { RequestOptions } from "../../components/Modals/RequestOptions";
import UserPlaylistInfo from "../../models/UserPlaylistInfo";
import { AxiosGet, AxiosPost } from "../UIApiHelperService";
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

export function RetrieveUserPlaylistInfo(): Promise<UserPlaylistInfo> {
    return AxiosGet<UserPlaylistInfo>("Playlist/GetUserInfo")
        .then((response) => {
            console.log(response.data as UserPlaylistInfo);
            return response.data as UserPlaylistInfo;
        })
        .catch(() => {
            return {} as UserPlaylistInfo;
        });
}

export function SubmitAddRequest(request: RequestOptions) {
    return AxiosPost<RequestOptions, string>("Playlist/AddRequest", request)
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}

export function SubmitEditRequest(request: RequestOptions) {
    return AxiosPost<RequestOptions, string>("Playlist/EditRequest", request)
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}

export function SubmitRemoveRequest(request: RequestOptions) {
    return (
        request.isCurrent
            ? AxiosPost<any, string>("Playlist/RemoveCurrent", { songId: request.songRequestId })
            : AxiosPost<any, string>("Playlist/RemoveRequest", { songId: request.songRequestId })
    )
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}

export function SubmitMarkInDriveRequest(request: RequestOptions) {
    return AxiosPost<any, string>("Playlist/MarkInDrive", { songId: request.songRequestId })
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}

export function SubmitPromoteRequest(request: RequestOptions) {
    return AxiosPost<any, string>("Playlist/PromoteRequest", {
        songId: request.songRequestId,
        useVip: request.useVipToken,
        useSuperVip: request.useSuperVipToken
    })
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}

export function SubmitChangePlaylistStateRequest(state: string) {
    return AxiosPost<any, string>("Playlist/SetPlaylistState", { playlistState: state })
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}

export function SubmitEmptyPlaylist() {
    return AxiosPost<any, string>("Playlist/EmptyPlaylist", {})
        .then((response) => {
            console.log(response.data as string);
            return response.data as string;
        })
        .catch(() => {
            return "Error";
        });
}
