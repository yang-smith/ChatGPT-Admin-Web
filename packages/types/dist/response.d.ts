import type { serverStatus } from "./server";
import { DALType } from "./dal";
export declare namespace ChatResponse {
    interface TicketGet {
        status: serverStatus;
        ticket: string;
        expiredAt: string;
    }
    interface UserLogin extends DALType.UserLogin {
        status: serverStatus;
    }
    interface UserRegister extends DALType.UserRegister {
        status: serverStatus;
    }
    interface UserRegisterCode {
        status: serverStatus;
        expiredAt: Date;
    }
    interface PlanGet {
        status: serverStatus;
        plans: DALType.Plan[];
    }
}
export interface RegisterResponse {
    status: serverStatus;
    sessionToken?: any;
}
//# sourceMappingURL=response.d.ts.map