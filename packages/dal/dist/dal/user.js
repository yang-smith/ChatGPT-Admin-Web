"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAL = void 0;
const spark_md5_1 = __importDefault(require("spark-md5"));
const types_1 = require("@caw/types");
const database_1 = __importDefault(require("@caw/database"));
const utils_1 = require("../utils");
// @dalErrorCatcher
class UserDAL {
    constructor() { }
    /**
     * 根据主键获取用户
     * @param id 主键，自增主键
     */
    static async getUser(id) {
        return database_1.default.user.findUnique({ where: { userId: id } });
    }
    /**
     * 根据唯一信息搜索用户
     */
    static async findUser({ providerId, providerContent, }) {
        switch (providerId) {
            case "email":
                return database_1.default.user.findUnique({
                    where: { email: providerContent },
                });
            case "phone":
                return database_1.default.user.findUnique({
                    where: { phone: providerContent },
                });
            case "wechat":
                const wechatInfo = await database_1.default.wechatInfo.findUnique({
                    where: { unionId: providerContent },
                    include: {
                        user: true,
                    },
                });
                if (!wechatInfo)
                    return null;
                return wechatInfo.user;
            default:
                throw Error("Please provide the correct way to find");
        }
    }
    /**
     * 注册
     * @param email
     * @param phone
     * @param wechatInfo
     * @param password
     * @param registerCode
     * @param invitationCode
     */
    static async register({ email, phone, password, registerCode, invitationCode, }) {
        /* 当使用邮箱注册时，必须输入密码
         * When using Email to register, you must enter your password
         * */
        if (email || phone) {
            if (email && phone)
                throw Error("Cannot pass both email and phone at one time");
            if (email && !password)
                throw Error("The password must be registered at the time of using cell phone number or email");
            if (!registerCode)
                throw Error("The code must be registered at the time of using cell phone number or email");
            /* 效验验证码
             * Validation code
             * */
            const validationCode = await database_1.default.registerCode.findUnique({
                where: {
                    register: phone ? phone : email,
                },
            });
            if (validationCode?.code.toString() !== registerCode)
                throw new types_1.ServerError(types_1.serverStatus.wrongPassword, "Password error");
        }
        const existUser = await database_1.default.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            equals: email,
                        },
                    },
                    {
                        phone: {
                            equals: phone,
                        },
                    },
                ],
            },
        });
        if (existUser.length > 0) {
            if (email) {
                throw new types_1.ServerError(types_1.serverStatus.alreadyExisted, "wechat user already exists");
            }
            if (phone) {
                return {
                    signedToken: await utils_1.accessTokenUtils.sign(7 * 24 * (60 * 60), {
                        uid: existUser[0].userId,
                    }),
                };
            }
        }
        const userInput = {
            email: email,
            phone: phone,
            passwordHash: password ? spark_md5_1.default.hash(password) : undefined,
            role: {
                connectOrCreate: {
                    where: {
                        name: "user",
                    },
                    create: {
                        name: "user", // TODO
                    },
                },
            },
        };
        const user = await database_1.default.user.create({ data: userInput });
        /* Accept Invitation */
        if (invitationCode) {
            const code = await database_1.default.invitationCode.findUnique({
                where: {
                    code: invitationCode,
                },
                include: {
                    owner: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            if (code) {
                /* If invitee id is exists, then make a record*/
                if (code.ownerId) {
                    const invitationRecordInput = {
                        invitee: {
                            connect: {
                                userId: code.ownerId,
                            },
                        },
                        codeRaw: {
                            connect: {
                                code: code.code,
                            },
                        },
                    };
                    await database_1.default.invitationRecord.create({
                        data: invitationRecordInput,
                    });
                }
                /*
                 * TODO Some invitation may have some benefit
                 * */
            }
            return {
                invitation: {
                    status: types_1.serverStatus.success,
                    inviter: code?.owner?.name ? code.owner.name : undefined,
                },
                signedToken: await utils_1.accessTokenUtils.sign(7 * 24 * (60 * 60), {
                    uid: user.userId,
                }),
            };
        }
        return {
            signedToken: await utils_1.accessTokenUtils.sign(7 * 24 * (60 * 60), {
                uid: user.userId,
            }),
        };
    }
    /**
   * 简单注册
   * @param email
   * @param password
   */
    static async registerSimple({ email, password, }) {
        /* 当使用邮箱注册时，必须输入密码 */
        if (!email || !password) {
            throw Error("Email and password must be provided");
        }
        const existUser = await database_1.default.user.findUnique({
            where: { email: email },
        });
        if (existUser) {
            throw new types_1.ServerError(types_1.serverStatus.alreadyExisted, "User with this email already exists");
        }
        const userInput = {
            email: email,
            passwordHash: spark_md5_1.default.hash(password),
            role: {
                connectOrCreate: {
                    where: {
                        name: "user",
                    },
                    create: {
                        name: "user",
                    },
                },
            },
        };
        const user = await database_1.default.user.create({ data: userInput });
        return {
            signedToken: await utils_1.accessTokenUtils.sign(7 * 24 * (60 * 60), {
                uid: user.userId,
            }),
        };
    }
    /**
     * 登录
     * @param loginType
     */
    static async login({ providerId, providerContent, }) {
        if (providerId !== "wechat" && !providerContent.password) {
            throw Error("password must be provided when login by email and phone");
        }
        const user = await this.findUser({
            providerId,
            providerContent: providerContent.content,
        });
        if (!user)
            return {
                errorCode: types_1.serverStatus.userNotExist,
                message: "user does not exist"
            };
        if (providerId !== "wechat" &&
            spark_md5_1.default.hash(providerContent.password ?? "") != user.passwordHash)
            return {
                errorCode: types_1.serverStatus.wrongPassword,
                message: "password not right"
            };
        /* default session duration is a week */
        return {
            signedToken: await utils_1.accessTokenUtils.sign(7 * 24 * (60 * 60), {
                uid: user.userId,
            }),
        };
    }
    async resetChances(userId, value) {
        const user = await database_1.default.user.findUniqueOrThrow({
            where: {
                userId: userId,
            },
            select: {
                resetChances: true,
            },
        });
        if (user.resetChances + value < 0)
            throw new types_1.ServerError(types_1.serverStatus.notEnoughChances, "not enough chances");
        return await database_1.default.user.update({
            where: {
                userId: userId,
            },
            data: {
                resetChances: value,
            },
        });
    }
    async getCurrentSubscription() { }
    async getAllSubscription() { }
}
exports.UserDAL = UserDAL;
