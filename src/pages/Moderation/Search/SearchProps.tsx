import TwitchAuthBaseModel from "../../../models/TwitchAuthBaseModel";

import { SongSearchProps } from '../../../services/ModerationService/ModerationServiceInterfaces';

export interface SearchProps extends TwitchAuthBaseModel {}

export const _defaultSongSearchProps = {
    songName: "",
    artistName: ""
} as SongSearchProps;
