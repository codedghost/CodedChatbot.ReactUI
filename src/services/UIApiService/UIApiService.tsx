import TwitchAuthBaseModel from '../../models/TwitchAuthBaseModel';
import UserPlaylistInfo from '../../models/UserPlaylistInfo';
import { RequestOptions } from '../../components/Modals/RequestOptions';
import {AxiosGet, AxiosPost} from '../UIApiHelperService'
import {ApiAvailabilityModel, GetLoggedInUserResponse} from './UIApiServiceInterfaces';


export function CheckApiAvailability(): Promise<boolean> {
    return AxiosGet<ApiAvailabilityModel>("Status").then((request) => {
        return true;
    }).catch((error) => {
        console.log(error)
        return false;
    })
}

export function GetUsername(): Promise<string> {
    return AxiosGet<GetLoggedInUserResponse>("Login/GetLoggedInUser")
        .then((response) => {
            return response.data.username;
        })
        .catch(() => {
            return "";
        });
}

export function GetAuthBaseModel(): Promise<TwitchAuthBaseModel> {
    return AxiosGet<TwitchAuthBaseModel>("Moderation/GetAuthBaseModel")
        .then((response) => {
            console.log(response.data as TwitchAuthBaseModel)
            return response.data as TwitchAuthBaseModel;
        })
        .catch(() => {
            return {} as TwitchAuthBaseModel;
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
            return response.data as string
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
    return (request.isCurrent 
        ? AxiosPost<any, string>("Playlist/RemoveCurrent", {songId: request.songRequestId}) 
        : AxiosPost<any, string>("Playlist/RemoveRequest", {songId: request.songRequestId}))
            .then((response) => {
                console.log(response.data as string);
                return response.data as string;
            })
            .catch(() => {
                return "Error";
            });
}