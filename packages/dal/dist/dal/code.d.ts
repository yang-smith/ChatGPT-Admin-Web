import { type RegisterCode, type InvitationCode } from "@caw/database";
/**
 * 一些码的管理，包括注册码、邀请码
 */
export declare class CodeDAL {
    constructor();
    /**
     * Get verification code
     * @param register Verification Information
     */
    static getCode(register: string): Promise<RegisterCode | null>;
    /**
     * 生成注册的有
     * @param type 注册类型
     * @param register 注册信息 手机号或邮箱地址
     * @return 返回过期的时间戳
     */
    static newCode({ type, register, }: {
        type: "email" | "phone";
        register: string;
    }): Promise<RegisterCode>;
    /**
     * 检查验证码是否一致
     * @param register 注册信息
     * @param codeProvided 需要被验证的验证码
     * @return 验证码是否一致
     */
    static validationCode({ register, codeProvided, }: {
        register: string;
        codeProvided: number;
    }): Promise<Boolean>;
    /**
     * 获取用户邀请码
     * @param userId 用户主键
     * @param createIfNull 当用户无邀请码时是否自动生成并返回
     */
    static getInvitationCode(userId: number, createIfNull?: boolean): Promise<InvitationCode[]>;
}
//# sourceMappingURL=code.d.ts.map