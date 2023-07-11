import { serverStatus } from "./server";
export declare class ServerError extends Error {
    readonly errorCode: serverStatus;
    constructor(code: number, message: string);
}
//# sourceMappingURL=error.d.ts.map