import { useParams } from "react-router-dom"
import StreamCounter from "../../../components/StreamCounter/StreamCounter";

export default function Counter() {

    const { counterName } = useParams();

    return (
        <StreamCounter counterName={counterName} />)
}