import { WechatTicket } from "@caw/database";
export declare class WechatDAL {
    constructor();
    /**
     *
     */
    static newTicket({ code, ticket, ttl, }: {
        code: number;
        ticket: string;
        ttl: number;
    }): Promise<WechatTicket>;
    /**
     *
     */
    static loginTicket(token: string): Promise<{
        signedToken: {
            token: string;
            expiredAt: number;
        };
    }>;
    /**
     * 注册微信
     */
    static registerByWechat({ unionId, openId, ticket, }: {
        unionId: string | null;
        openId: string;
        ticket: string;
    }): Promise<WechatTicket>;
    /**
     * 通过微信登录
     */
    static loginByWechat({ ticket, openId, }: {
        ticket: string;
        openId: string;
    }): Promise<void>;
}
//# sourceMappingURL=wechat.d.ts.map