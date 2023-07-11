"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatDAL = void 0;
const database_1 = __importDefault(require("@caw/database"));
const utils_1 = require("../utils");
const types_1 = require("@caw/types");
class WechatDAL {
    constructor() { }
    /**
     *
     */
    static async newTicket({ code, ticket, ttl, }) {
        return await database_1.default.wechatTicket.create({
            data: {
                code,
                ticket,
                expiredAt: new Date(Date.now() + ttl * 1000 * 1000),
            },
        });
    }
    /**
     *
     */
    static async loginTicket(token) {
        const ticket = await database_1.default.wechatTicket.findUnique({
            where: {
                ticket: token,
            },
        });
        if (!ticket)
            throw new types_1.ServerError(types_1.serverStatus.invalidTicket, "invalid ticket");
        if (!ticket.openId)
            throw new types_1.ServerError(types_1.serverStatus.unScannedTicket, "not scanned");
        const user = await database_1.default.wechatInfo.findUnique({
            where: {
                openId: ticket.openId,
            },
        });
        if (!user)
            throw new types_1.ServerError(types_1.serverStatus.userNotExist, "user does not exist");
        return {
            signedToken: await utils_1.accessTokenUtils.sign(7 * 24 * (60 * 60), {
                uid: user.userId,
            }),
        };
    }
    /**
     * 注册微信
     */
    static async registerByWechat({ unionId, openId, ticket, }) {
        const existUser = await database_1.default.wechatInfo.findMany({
            where: {
                OR: [
                    {
                        unionId: unionId,
                    },
                    {
                        openId: openId,
                    },
                ],
            },
        });
        /* 如果用户不存在则先注册 */
        if (existUser.length === 0) {
            const userInput = {
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
                wechat: {
                    connectOrCreate: {
                        where: {
                            ...(unionId ? { unionId: unionId } : { openId: openId }),
                        },
                        create: {
                            unionId: unionId,
                            openId: openId,
                        },
                    },
                },
            };
            await database_1.default.user.create({ data: userInput });
        }
        return await database_1.default.wechatTicket.update({
            where: {
                ticket: ticket,
            },
            data: {
                openId: openId,
            },
        });
    }
    /**
     * 通过微信登录
     */
    static async loginByWechat({ ticket, openId, }) {
        await database_1.default.wechatTicket.update({
            where: {
                ticket: ticket,
            },
            data: {
                openId: openId,
            },
        });
    }
}
exports.WechatDAL = WechatDAL;
