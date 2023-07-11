"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDAL = void 0;
const database_1 = __importDefault(require("@caw/database"));
const client_1 = require("@prisma/client");
class OrderDAL {
    constructor() { }
    static getNextId() {
        const timestamp = new Date().getTime().toString();
        const randomDigits = (Math.random() * 1e6)
            .toFixed(0)
            .padStart(6, "0");
        return `${timestamp}${randomDigits}`;
    }
    static async newOrder({ userId, planId, priceId, count, }) {
        const price = await database_1.default.prices.findUniqueOrThrow({
            where: {
                id: priceId,
            },
        });
        const orderInput = {
            orderId: this.getNextId(),
            count: count,
            amount: 0.01 * count,
            status: client_1.OrderStatus.Pending,
            plan: {
                connect: {
                    planId,
                },
            },
            price: {
                connect: {
                    id: priceId,
                },
            },
            user: {
                connect: {
                    userId,
                },
            },
        };
        return await database_1.default.order.create({ data: orderInput });
    }
    static async payOrder(orderId) {
        const newOrder = await database_1.default.order.update({
            where: {
                orderId: orderId,
            },
            data: {
                status: client_1.OrderStatus.Paid,
            },
            include: {
                price: true,
            },
        });
        const currentDate = new Date();
        const subscriptionInput = {
            createdAt: currentDate,
            expiredAt: new Date(currentDate.getTime() + newOrder.price.duration * 1000),
            order: {
                connect: {
                    orderId: orderId,
                },
            },
            plan: {
                connect: {
                    planId: newOrder.planId,
                },
            },
            user: {
                connect: {
                    userId: newOrder.userId,
                },
            },
        };
        return {
            order: newOrder,
            subscription: await database_1.default.subscription.create({
                data: subscriptionInput,
            }),
        };
    }
}
exports.OrderDAL = OrderDAL;
