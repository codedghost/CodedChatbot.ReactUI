import { useEffect, useState } from "react";
import { CounterInfo, _defaultCounterInfo } from "./CounterInfo";
import { RetrieveCounterInfo } from "../../services/CounterService/CounterService";
import StreamCounterProps from "./StreamCounterProps";

import "./StreamCounter.scss";

function StreamCounter(props: StreamCounterProps) {
    const [counterInfo, updateCounterInfo] =
        useState<CounterInfo>(_defaultCounterInfo);

    useEffect(() => {
        if (props.counterName) {
            RetrieveCounterInfo(props.counterName).then(
                (retrievedCounterInfo) => {
                    updateCounterInfo(retrievedCounterInfo);
                }
            );
        }
    }, [props.counterName]);

    const counterContent = (
        <h2 className='counter'>{`${counterInfo.counterPreText}: ${counterInfo.counterValue}`}</h2>
    );

    return counterInfo ? counterContent : <></>;
}

StreamCounter.defaultProps = {
    counterName: "",
} as StreamCounterProps;

export default StreamCounter;
