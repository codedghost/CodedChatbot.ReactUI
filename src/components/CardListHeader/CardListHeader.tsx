import { Card } from "react-bootstrap";

function CardListHeader(props: CardListHeaderProps) {
    return (
        <div className="d-flex justify-content-center header col-12">
            <Card body bg="secondary" text="light">
                <b>{props.headerText}</b>
            </Card>
        </div>
    );
}

CardListHeader.defaultProps = {
    headerText: "",
} as CardListHeaderProps;

export default CardListHeader;

export interface CardListHeaderProps {
    headerText: string;
}
