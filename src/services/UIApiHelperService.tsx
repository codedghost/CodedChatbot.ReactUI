import axios, { AxiosResponse } from 'axios';
import Config from './Config/Config';

export function GetUiApiUrl(endpoint: string): string {
    return `${Config.Api.UI}${endpoint}`;
}

export function AxiosGet<T>(uiEndpoint: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(GetUiApiUrl(uiEndpoint), {withCredentials: true});
}