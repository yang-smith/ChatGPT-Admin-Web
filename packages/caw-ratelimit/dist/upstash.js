"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRateLimiter = exports.defaultRedis = void 0;
const ratelimit_1 = require("@upstash/ratelimit");
const redis_1 = require("@upstash/redis");
const types_1 = require("@caw/types");
exports.defaultRedis = new redis_1.Redis({
    url: process.env.REDIS_URL ?? "",
    token: process.env.REDIS_TOKEN ?? "",
});
class ModelRateLimiter extends ratelimit_1.Ratelimit {
    /**
     * construct a new model rate limiter by email and model provided
     * @returns null if the plan or model does not exist
     */
    static async create({ userId, model, limit, duration /* unit is second */, redis = exports.defaultRedis, }) {
        return new ModelRateLimiter({
            redis,
            userId,
            model,
            limit,
            window: `${duration}s`,
        });
    }
    #userId;
    #windowSize;
    #redis;
    #limit;
    #prefix;
    constructor({ redis = exports.defaultRedis, userId, model, limit, window, }) {
        const prefix = `ratelimit:${userId}:${model}`;
        super({
            redis,
            prefix,
            limiter: ratelimit_1.Ratelimit.slidingWindow(limit, window),
        });
        this.#userId = userId;
        this.#windowSize = (0, types_1.ms)(window);
        this.#redis = redis;
        this.#limit = limit;
        this.#prefix = prefix;
    }
    clear() {
        return this.#redis.del(`${this.#prefix}:${this.#userId}:*`);
    }
}
exports.ModelRateLimiter = ModelRateLimiter;
