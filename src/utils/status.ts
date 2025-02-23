import { get } from "./fetch";

export function getStatus() {
    type Status = {
        cpuTemp: number;
        uptime: number;
        cpus: number[];
        memTotal: number;
        memFree: number;
    };
    return get<Status>(`status`);
}
