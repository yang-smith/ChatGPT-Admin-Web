import { type Order, type Subscription } from "@prisma/client";
export declare class OrderDAL {
    constructor();
    static getNextId(): string;
    static newOrder({ userId, planId, priceId, count, }: {
        userId: number;
        planId: number;
        priceId: number;
        count: number;
    }): Promise<Order>;
    static payOrder(orderId: string): Promise<{
        order: Order;
        subscription: Subscription;
    }>;
}
//# sourceMappingURL=order.d.ts.map