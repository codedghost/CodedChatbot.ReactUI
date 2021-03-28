import axios from 'axios';
import Config from '../Config/Config';

interface GetLoggedInUserResponse {
    username: string
}

export function GetUsername(): Promise<string> {
    return axios.get<GetLoggedInUserResponse>(`${Config.Api.UI}Login/GetLoggedInUser`, {withCredentials: true})
        .then((response) => {
            return response.data.username;
        });
}