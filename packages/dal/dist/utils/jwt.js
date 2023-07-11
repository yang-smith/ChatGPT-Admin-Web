"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeToken = exports.parseUserId = exports.accessTokenUtils = void 0;
const jose_1 = require("jose");
const types_1 = require("@caw/types");
var accessTokenUtils;
(function (accessTokenUtils) {
    /**
     * 签发令牌
     * @param duration 持续时间
     * @param payload 负载
     */
    async function sign(duration, payload) {
        const iat = Math.floor(Date.now() / 1000); // Not before: Now
        const exp = iat + duration; // Expires: Now + 1 week
        return {
            token: await new jose_1.SignJWT({ ...payload })
                .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                .setExpirationTime(exp)
                .setIssuedAt(iat)
                .setNotBefore(iat)
                .sign(new TextEncoder().encode(process.env.JWT_SECRET)),
            expiredAt: exp,
        };
    }
    accessTokenUtils.sign = sign;
    /**
     * 效验令牌，返回负载
     * @param token
     */
    async function verify(token) {
        try {
            const { payload } = await (0, jose_1.jwtVerify)(token, new TextEncoder().encode(process.env.JWT_SECRET));
            return payload;
        }
        catch (e) {
            throw new types_1.ServerError(types_1.serverStatus.invalidToken, "Invalid token");
        }
    }
    accessTokenUtils.verify = verify;
})(accessTokenUtils = exports.accessTokenUtils || (exports.accessTokenUtils = {}));
async function parseUserId(token) {
    const { uid: userId } = (await accessTokenUtils.verify(token));
    return userId;
}
exports.parseUserId = parseUserId;
async function resumeToken(token) {
    return await accessTokenUtils.sign(7 * 24 * (60 * 60), {
        uid: parseUserId(token),
    });
}
exports.resumeToken = resumeToken;
