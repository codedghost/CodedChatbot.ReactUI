import { AxiosDelete, AxiosGet, AxiosPost } from "../UIApiHelperService";
import { PagedQuoteResponse } from "./QuotesServiceInterfaces";

export function GetQuotes(
    page: number,
    pageSize: number,
    isModerator: boolean
): Promise<PagedQuoteResponse> {
    var url = "Quotes/GetQuotes";

    var setPrependCharacter = (url: string) => {
        if (url.indexOf("?") < 0) {
            return "?";
        }
        return "&";
    };

    if (page) {
        url += `${setPrependCharacter(url)}page=${page}`;
    }

    if (pageSize) {
        url += `${setPrependCharacter(url)}pageSize=${pageSize}`;
    }

    if (!isModerator) {
        url += `${setPrependCharacter(
            url
        )}filterByColumnName=Enabled&filterByValue=true`;
    }

    return AxiosGet<PagedQuoteResponse>(url)
        .then((response) => {
            return response.data as PagedQuoteResponse;
        })
        .catch(() => {
            return {} as PagedQuoteResponse;
        });
}

export function SendQuoteToChat(quoteId: number): Promise<boolean> {
    return AxiosPost<any, boolean>(`Quotes/SendQuoteToChat?id=${quoteId}`, {})
        .then((response) => response.data)
        .catch(() => false);
}

export function ArchiveQuote(quoteId: number): Promise<boolean> {
    return AxiosDelete(`Quotes/DeleteQuote?id=${quoteId}`)
        .then((response) => response.status === 200)
        .catch(() => false);
}
