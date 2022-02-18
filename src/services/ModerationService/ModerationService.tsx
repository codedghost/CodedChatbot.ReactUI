import TwitchAuthBaseModel from "../../models/TwitchAuthBaseModel";
import { SongSearchProps, SongSearchResult, TransferUserProps } from "./ModerationServiceInterfaces";

import { AxiosGet, AxiosPost } from "../UIApiHelperService";

export function GetAuthBaseModel(): Promise<TwitchAuthBaseModel> {
    return AxiosGet<TwitchAuthBaseModel>("Moderation/GetAuthBaseModel")
        .then((response) => {
            console.log(response.data as TwitchAuthBaseModel);
            return response.data as TwitchAuthBaseModel;
        })
        .catch(() => {
            return {} as TwitchAuthBaseModel;
        });
}

export function ModerationSongSearch(songSearchProps: SongSearchProps) {
    return AxiosPost<any, SongSearchResult[]>("Moderation/SongSearch", songSearchProps).then((response) => {
        console.log(response.data as SongSearchResult[]);
        return response.data as SongSearchResult[];
    });
}

export function ModerationTransferUser(transferUserProps: TransferUserProps) {
    return AxiosPost<any, boolean>("Moderation/ModerationTransferUser", transferUserProps).then((response) => {
        console.log(response.data as boolean);
        return response.data as boolean;
    });
}
