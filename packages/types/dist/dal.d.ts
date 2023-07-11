import type { serverStatus } from "./server";
export declare namespace DALType {
    type Price = {
        id: number;
        name: string;
        amount: number;
        duration: number;
    };
    type Limit = {
        modelName: string;
        times: number;
        duration: number;
    };
    interface UserLogin {
        signedToken: {
            token: string;
            expiredAt: number;
        };
        errorCode?: number;
    }
    interface UserRegister extends UserLogin {
        invitation?: {
            status: serverStatus;
            inviter?: string;
        };
    }
    interface Plan {
        planId: number;
        name: string;
        features: string[];
        prices: Price[];
        limits: Limit[];
    }
    interface newPlan {
        name: string;
        prices: Price[];
        limits: Limit[];
    }
}
//# sourceMappingURL=dal.d.ts.map