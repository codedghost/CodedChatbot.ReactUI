import { useEffect, useState } from "react";
import CardListCard from "./CardListCard";
import { AnimateSharedLayout, motion } from "framer-motion";

import "./CardList.scss";
import { Card } from "react-bootstrap";
import ActionIcon from "../ActionIcon/ActionIcon";

function CardList(props: CardListProps) {
    const spring = {
        type: "spring",
        damping: 20,
        stiffness: 300,
    };

    var cardsListContent = props.cards ? (
        props.cards.map((card) => {
            var actionIcons = card.actionIcons.map((icon) => (
                <>
                    <ActionIcon {...icon} />
                </>
            ));

            return (
                <>
                    <motion.div
                        key={card.key}
                        layout
                        transition={spring}
                        layoutId={card.key.toString()}
                        className="animated-card-item"
                    >
                        <div className="col-12 container">
                            <Card body bg="secondary" text="light">
                                {card.headerContent}
                                <div className="d-flex justify-content-between">
                                    <div>{card.mainContent}</div>
                                    <span className="d-flex flex-column">
                                        {actionIcons}
                                    </span>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                </>
            );
        })
    ) : (
        <></>
    );

    return (
        <>
            <AnimateSharedLayout>{cardsListContent}</AnimateSharedLayout>
        </>
    );
}

CardList.defaultProps = {
    cards: [],
} as CardListProps;

export interface CardListProps {
    cards: CardListCard[];
}

export default CardList;
