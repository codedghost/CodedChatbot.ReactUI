export interface RequestOptions {
    songRequestId: number,
    songName: string,
    artistName: string,
    instrument: string,
    useVipToken: boolean,
    useSuperVipToken: boolean,
    isCurrent: false,
    errorMessage: string
}

export const _defaultRequestOptions = {
    songRequestId: 0,
    songName: "",
    artistName: "",
    instrument: "",
    useVipToken: false,
    useSuperVipToken: false,
    isCurrent: false,
    errorMessage: ""
} as RequestOptions;