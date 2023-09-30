import { useEffect, useState } from "react";
import CardList from "../../../components/CardList/CardList";
import CardListHeader from "../../../components/CardListHeader/CardListHeader";
import QuotesProps from "./QuotesProps";
import {
    ArchiveQuote,
    GetQuotes,
    SendQuoteToChat,
} from "../../../services/QuotesService/QuotesService";
import { Quote } from "../../../services/QuotesService/QuotesServiceInterfaces";
import { ActionIconProps } from "../../../components/ActionIcon/ActionIcon";
import { IsNullOrWhiteSpace } from "../../../services/StringHelperService";
import "./Quotes.scss";
import { Pagination } from "react-bootstrap";

function Quotes(props: QuotesProps) {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [totalQuotes, setTotalQuotes] = useState<number>(0);
    const [selectedPage, setSelectedPage] = useState<number>(1);
    const [pagination, setPagination] = useState<JSX.Element>(<></>);

    const pageSize = 20;

    useEffect(() => {
        // Go retrieve paginated quotes
        // Get paging state from url
        GetQuotes(selectedPage - 1, pageSize, props?.isModerator ?? false).then(
            (data) => {
                setQuotes(data.quotes);
                setTotalQuotes(data.total);
            }
        );
    }, [selectedPage]);

    useEffect(() => {
        if (totalQuotes === 0) {
            setPagination(<></>);
            return;
        }

        var items = [];
        for (var page = 1; page <= totalQuotes / pageSize; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === selectedPage}
                    onClick={(event) => {
                        setSelectedPage(+event.currentTarget.innerText);
                    }}
                >
                    {page}
                </Pagination.Item>
            );
        }

        var basicPagination = <Pagination>{items}</Pagination>;

        setPagination(basicPagination);
    }, [totalQuotes]);

    var actionIcons = (quote: Quote, props: QuotesProps): ActionIconProps[] => {
        var actionIcons = [] as ActionIconProps[];
        if (!quote.disabled) {
            if (!IsNullOrWhiteSpace(props.username)) {
                actionIcons.push({
                    Icon: "ChatDots",
                    Colour: "White",
                    AltText: "Send Quote to Twitch Chat",
                    Size: "Medium",
                    onClick: () => {
                        SendQuoteToChat(quote.quoteId).then((success) => {});
                    },
                } as ActionIconProps);
            }

            if (props.isModerator) {
                actionIcons.push({
                    Icon: "Remove",
                    Colour: "Red",
                    AltText: "Archive this Quote",
                    Size: "Medium",
                    onClick: () => {
                        ArchiveQuote(quote.quoteId).then((success) => {});
                    },
                } as ActionIconProps);
            }
        } else {
            actionIcons.push({
                Icon: "Tick",
                Colour: "Green",
                AltText: "Re-enable this Quote",
                Size: "Medium",
            } as ActionIconProps);
        }

        return actionIcons;
    };

    var cardListCards = quotes.map((quote) => {
        var modContent = props.isModerator ? (
            quote.disabled ? (
                <div>THIS QUOTE IS ARCHIVED</div>
            ) : (
                <></>
            )
        ) : (
            <></>
        );

        return {
            key: quote.quoteId,
            headerContent: (
                <h3 className="quote-header-content">
                    Quote {quote.quoteId} - @{quote.createdBy}
                </h3>
            ),
            mainContent: (
                <>
                    <div>{quote.quoteText}</div>
                    {modContent}
                </>
            ),
            actionIcons: actionIcons(quote, props),
        };
    });

    return (
        <>
            <CardListHeader headerText="Quotes" />
            <CardList cards={cardListCards} />

            <div className="d-flex justify-content-between">
                <div>Total: {totalQuotes}</div>
                {pagination}
            </div>
        </>
    );
}

Quotes.defaultProps = {
    username: "",
    isModerator: false,
} as QuotesProps;

export default Quotes;
