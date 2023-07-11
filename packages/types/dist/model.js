"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotType = void 0;
const zod_1 = require("zod");
var BotType;
(function (BotType) {
    BotType.gptModel = zod_1.z.enum(["gpt-3.5-turbo", "gpt-4"]);
    BotType.otherModel = zod_1.z.enum(["new-bing"]);
    const chatRole = zod_1.z.enum(["assistant", "system", "user"]);
    const chatRecord = zod_1.z.object({
        role: chatRole,
        content: zod_1.z.string(),
    });
    BotType.postPayload = zod_1.z.object({
        messages: chatRecord.array().nonempty(),
        // maxTokens: z.number().optional(),
        stream: zod_1.z.boolean(),
        model: BotType.gptModel.or(BotType.otherModel),
        temperature: zod_1.z.number().optional(),
        presence_penalty: zod_1.z.number().optional(),
        frequency_penalty: zod_1.z.number().optional(),
    });
})(BotType = exports.BotType || (exports.BotType = {}));
