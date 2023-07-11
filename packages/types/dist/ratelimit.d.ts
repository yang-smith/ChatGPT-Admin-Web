import { z } from "zod";
export declare const unit: z.ZodEnum<["ms", "s", "m", "h", "d"]>;
export type Unit = z.infer<typeof unit>;
export declare const duration: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>]>;
export type Duration = `${number} ${Unit}` | `${number}${Unit}`;
/**
 * Convert a human-readable duration to milliseconds
 */
export declare function ms(d: Duration): number;
export declare const modelLimit: z.ZodObject<{
    window: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>]>;
    limit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    window: string;
    limit: number;
}, {
    window: string;
    limit: number;
}>;
export type ModelLimit = z.infer<typeof modelLimit>;
export declare const plan: z.ZodObject<{
    prices: z.ZodObject<{
        monthly: z.ZodNumber;
        quarterly: z.ZodNumber;
        yearly: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        monthly: number;
        quarterly: number;
        yearly: number;
    }, {
        monthly: number;
        quarterly: number;
        yearly: number;
    }>;
    limits: z.ZodRecord<z.ZodString, z.ZodObject<{
        window: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>]>;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        window: string;
        limit: number;
    }, {
        window: string;
        limit: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    prices: {
        monthly: number;
        quarterly: number;
        yearly: number;
    };
    limits: Record<string, {
        window: string;
        limit: number;
    }>;
}, {
    prices: {
        monthly: number;
        quarterly: number;
        yearly: number;
    };
    limits: Record<string, {
        window: string;
        limit: number;
    }>;
}>;
export type Plan = z.infer<typeof plan>;
//# sourceMappingURL=ratelimit.d.ts.map