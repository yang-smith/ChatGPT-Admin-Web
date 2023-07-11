"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanDAL = void 0;
const database_1 = __importDefault(require("@caw/database"));
// @dalErrorCatcher
class PlanDAL {
    constructor() { }
    static async getPlan() {
        return await database_1.default.plan.findMany({
            include: {
                prices: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                        duration: true,
                    },
                },
                limits: {
                    select: {
                        modelName: true,
                        times: true,
                        duration: true,
                    },
                },
                orders: false,
                redeems: false,
                subscriptions: false,
            },
        });
    }
}
exports.PlanDAL = PlanDAL;
