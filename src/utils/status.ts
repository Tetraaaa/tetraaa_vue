import { get } from "./fetch";
export type PeribotStatus = {
    status: string;
    uptime: number;
    memoryUsed: number;
    cachedChannels: number;
    totalAttachments: number;
};
export type Status = {
    cpuTemp: number;
    uptime: number;
    cpus: number[];
    memTotal: number;
    memFree: number;
    peribotStatus: PeribotStatus;
};
export function getStatus() {
    return get<Status>(`status`);
}
