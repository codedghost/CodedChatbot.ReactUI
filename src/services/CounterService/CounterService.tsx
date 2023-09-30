import { CounterInfo } from "../../components/StreamCounter/CounterInfo";
import { AxiosGet } from "../UIApiHelperService";

export function RetrieveCounterInfo(counterName: string): Promise<CounterInfo> {

    return AxiosGet<CounterInfo>(`Counter/GetCounter?counterName=${counterName}`)
        .then((response) => {
            return response.data as CounterInfo;
        })
        .catch(() => {
            return {} as CounterInfo;
        });
}