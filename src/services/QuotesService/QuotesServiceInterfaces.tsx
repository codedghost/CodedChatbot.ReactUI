export interface Quote {
    quoteId: number;
    quoteText: string;
    createdBy: string;
    disabled: boolean;
    lastEditedBy: string;
    editedAt: Date;
}

export interface PagedQuoteResponse {
    quotes: Quote[];
    total: number;
}
