"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plan = exports.modelLimit = exports.ms = exports.duration = exports.unit = void 0;
const zod_1 = require("zod");
exports.unit = zod_1.z.enum(["ms", "s", "m", "h", "d"]);
exports.duration = zod_1.z.union([
    zod_1.z.string().refine((value) => /^\d+\s(ms|s|m|h|d)$/.test(value), {
        message: "Invalid Duration format. Should be `${number} ${Unit}`.",
    }),
    zod_1.z.string().refine((value) => /^\d+(ms|s|m|h|d)$/.test(value), {
        message: "Invalid Duration format. Should be `${number}${Unit}`.",
    }),
]);
/**
 * Convert a human-readable duration to milliseconds
 */
function ms(d) {
    const match = d.match(/^(\d+)\s?(ms|s|m|h|d)$/);
    if (!match) {
        throw new Error(`Unable to parse window size: ${d}`);
    }
    const time = parseInt(match[1]);
    const unit = match[2];
    switch (unit) {
        case "ms":
            return time;
        case "s":
            return time * 1000;
        case "m":
            return time * 1000 * 60;
        case "h":
            return time * 1000 * 60 * 60;
        case "d":
            return time * 1000 * 60 * 60 * 24;
        default:
            throw new Error(`Unable to parse window size: ${d}`);
    }
}
exports.ms = ms;
exports.modelLimit = zod_1.z.object({
    window: exports.duration,
    limit: zod_1.z.number().nonnegative(),
});
// key: plan:${planName}
exports.plan = zod_1.z.object({
    prices: zod_1.z.object({
        monthly: zod_1.z.number().nonnegative(),
        quarterly: zod_1.z.number().nonnegative(),
        yearly: zod_1.z.number().nonnegative(),
    }),
    limits: zod_1.z.record(exports.modelLimit),
});
