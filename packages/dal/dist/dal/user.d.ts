import { DALType } from "@caw/types";
import { type User } from "@caw/database";
export type providerType = "email" | "phone" | "wechat";
export declare class UserDAL {
    constructor();
    /**
     * 根据主键获取用户
     * @param id 主键，自增主键
     */
    static getUser(id: number): Promise<User | null>;
    /**
     * 根据唯一信息搜索用户
     */
    static findUser({ providerId, providerContent, }: {
        providerId: providerType;
        providerContent: string;
    }): Promise<User | null>;
    /**
     * 注册
     * @param email
     * @param phone
     * @param wechatInfo
     * @param password
     * @param registerCode
     * @param invitationCode
     */
    static register({ email, phone, password, registerCode, invitationCode, }: {
        email?: string;
        phone?: string;
        password?: string;
        registerCode?: string;
        invitationCode?: string;
    }): Promise<DALType.UserRegister>;
    /**
   * 简单注册
   * @param email
   * @param password
   */
    static registerSimple({ email, password, }: {
        email: string;
        password: string;
    }): Promise<DALType.UserRegister>;
    /**
     * 登录
     * @param loginType
     */
    static login({ providerId, providerContent, }: {
        providerId: providerType;
        providerContent: {
            content: string;
            password?: string;
        };
    }): Promise<DALType.UserLogin>;
    resetChances(userId: number, value: number): Promise<User>;
    getCurrentSubscription(): Promise<void>;
    getAllSubscription(): Promise<void>;
}
//# sourceMappingURL=user.d.ts.map