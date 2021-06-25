import TwitchAuthBaseModel from '../../models/TwitchAuthBaseModel';
import {AxiosGet} from '../UIApiHelperService'
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