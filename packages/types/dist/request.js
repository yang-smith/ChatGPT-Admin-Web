"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequest = void 0;
const zod_1 = require("zod");
var ChatRequest;
(function (ChatRequest) {
    /**
     *
     */
    ChatRequest.UserLogin = zod_1.z.object({
        providerId: zod_1.z.string(),
        providerContent: zod_1.z.object({
            content: zod_1.z.string(),
            password: zod_1.z.string(),
        }),
    });
    /**
     *
     */
    ChatRequest.UserRegisterPost = zod_1.z.object({
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        register_code: zod_1.z.string().optional(),
        invitation_code: zod_1.z.string().optional(),
    });
    /**
     *
     */
    ChatRequest.UserRegisterCodeGet = zod_1.z.object({
        type: zod_1.z.enum(["email", "phone"]),
        value: zod_1.z.string(),
    });
    ChatRequest.UserRegisterSimple = zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    ChatRequest.RequestNewOrder = zod_1.z.object({
        planId: zod_1.z.number(),
        priceId: zod_1.z.number(),
    });
})(ChatRequest = exports.ChatRequest || (exports.ChatRequest = {}));
