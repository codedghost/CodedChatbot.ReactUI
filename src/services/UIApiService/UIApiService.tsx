import axios, { AxiosResponse } from 'axios';
import Config from '../Config/Config';

import {ApiAvailabilityModel, GetLoggedInUserResponse} from './UIApiServiceInterfaces';

function GetUiApiUrl(endpoint: string): string {
    return `${Config.Api.UI}${endpoint}`;
}

function AxiosGet<T>(uiEndpoint: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(GetUiApiUrl(uiEndpoint), {withCredentials: true});
}

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