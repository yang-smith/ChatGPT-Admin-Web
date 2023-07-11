"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeDAL = void 0;
const database_1 = __importStar(require("@caw/database"));
const utils_1 = require("../utils");
/**
 * 一些码的管理，包括注册码、邀请码
 */
// @dalErrorCatcher
class CodeDAL {
    constructor() { }
    /**
     * Get verification code
     * @param register Verification Information
     */
    static async getCode(register) {
        return database_1.default.registerCode.findUnique({
            where: {
                register: register,
            },
        });
    }
    /**
     * 生成注册的有
     * @param type 注册类型
     * @param register 注册信息 手机号或邮箱地址
     * @return 返回过期的时间戳
     */
    static async newCode({ type, register, }) {
        const expiredTimeStamp = Date.now() + 600 * 1000 * 10;
        const codeInput = {
            type: "phone" ? database_1.RegisterType.Phone : database_1.RegisterType.Email,
            register: register,
            code: (0, utils_1.generateRandomSixDigitNumber)(),
            expiredAt: new Date(expiredTimeStamp), // 默认十分钟
        };
        try {
            return await database_1.default.registerCode.create({ data: codeInput });
        }
        catch (error) {
            /* Registration records exist */
            if (error instanceof database_1.Prisma.PrismaClientKnownRequestError &&
                error.code == "P2002") {
                return await database_1.default.registerCode.upsert({
                    where: {
                        register: register,
                    },
                    update: {
                        type: "phone" ? database_1.RegisterType.Phone : database_1.RegisterType.Email,
                        code: (0, utils_1.generateRandomSixDigitNumber)(),
                        expiredAt: new Date(expiredTimeStamp),
                    },
                    create: codeInput,
                });
            }
            else {
                throw error;
            }
        }
    }
    /**
     * 检查验证码是否一致
     * @param register 注册信息
     * @param codeProvided 需要被验证的验证码
     * @return 验证码是否一致
     */
    static async validationCode({ register, codeProvided, }) {
        return this.getCode(register).then((code) => {
            return code ? code?.code === codeProvided : false;
        });
    }
    /**
     * 获取用户邀请码
     * @param userId 用户主键
     * @param createIfNull 当用户无邀请码时是否自动生成并返回
     */
    static async getInvitationCode(userId, createIfNull = true) {
        const invitationCodes = await database_1.default.invitationCode.findMany({
            where: {
                ownerId: userId,
            },
        });
        if (invitationCodes.length === 0 && createIfNull) {
            return [
                await database_1.default.invitationCode.create({
                    data: {
                        code: (0, utils_1.generateRandomString)(6),
                        ownerId: userId,
                    },
                    include: {},
                }),
            ];
        }
        return invitationCodes;
    }
}
exports.CodeDAL = CodeDAL;
