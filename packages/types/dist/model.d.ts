import { z } from "zod";
import type { ChatCompletionResponseMessage, CreateChatCompletionResponse } from "openai";
export declare namespace BotType {
    type Model = "gpt-3.5-turbo" | "gpt-4" | "newbing";
    const gptModel: z.ZodEnum<["gpt-3.5-turbo", "gpt-4"]>;
    const otherModel: z.ZodEnum<["new-bing"]>;
    type ChatRequest = {
        model?: Model;
        conversation: ChatCompletionResponseMessage[];
        stream?: boolean;
    };
    type ChatResponse = CreateChatCompletionResponse;
    const postPayload: z.ZodObject<{
        messages: z.ZodArray<z.ZodObject<{
            role: z.ZodEnum<["assistant", "system", "user"]>;
            content: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
            role: "assistant" | "system" | "user";
        }, {
            content: string;
            role: "assistant" | "system" | "user";
        }>, "atleastone">;
        stream: z.ZodBoolean;
        model: z.ZodUnion<[z.ZodEnum<["gpt-3.5-turbo", "gpt-4"]>, z.ZodEnum<["new-bing"]>]>;
        temperature: z.ZodOptional<z.ZodNumber>;
        presence_penalty: z.ZodOptional<z.ZodNumber>;
        frequency_penalty: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        messages: [{
            content: string;
            role: "assistant" | "system" | "user";
        }, ...{
            content: string;
            role: "assistant" | "system" | "user";
        }[]];
        stream: boolean;
        model: "gpt-3.5-turbo" | "gpt-4" | "new-bing";
        temperature?: number | undefined;
        presence_penalty?: number | undefined;
        frequency_penalty?: number | undefined;
    }, {
        messages: [{
            content: string;
            role: "assistant" | "system" | "user";
        }, ...{
            content: string;
            role: "assistant" | "system" | "user";
        }[]];
        stream: boolean;
        model: "gpt-3.5-turbo" | "gpt-4" | "new-bing";
        temperature?: number | undefined;
        presence_penalty?: number | undefined;
        frequency_penalty?: number | undefined;
    }>;
}
//# sourceMappingURL=model.d.ts.map