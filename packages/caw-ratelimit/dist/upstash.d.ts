import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
export declare const defaultRedis: Redis;
export declare class ModelRateLimiter extends Ratelimit {
    #private;
    /**
     * construct a new model rate limiter by email and model provided
     * @returns null if the plan or model does not exist
     */
    static create({ userId, model, limit, duration, redis, }: CreateModelRateLimiterParams): Promise<ModelRateLimiter | null>;
    private constructor();
    clear(): Promise<number>;
}
export type CreateModelRateLimiterParams = {
    userId: string;
    model: string;
    limit: number;
    duration: number;
    redis?: Redis;
};
//# sourceMappingURL=upstash.d.ts.map