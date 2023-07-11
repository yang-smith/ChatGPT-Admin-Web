import { type JWTPayload } from "jose";
export declare namespace accessTokenUtils {
    /**
     * 签发令牌
     * @param duration 持续时间
     * @param payload 负载
     */
    function sign<T extends JWTPayload>(duration: number, payload: T): Promise<{
        token: string;
        expiredAt: number;
    }>;
    /**
     * 效验令牌，返回负载
     * @param token
     */
    function verify(token: string): Promise<JWTPayload>;
}
export declare function parseUserId(token: string): Promise<number>;
export declare function resumeToken(token: string): Promise<{
    token: string;
    expiredAt: number;
}>;
//# sourceMappingURL=jwt.d.ts.map