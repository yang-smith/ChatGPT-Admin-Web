import { z } from "zod";
export declare namespace ChatRequest {
    /**
     *
     */
    const UserLogin: z.ZodObject<{
        providerId: z.ZodString;
        providerContent: z.ZodObject<{
            content: z.ZodString;
            password: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            content: string;
            password: string;
        }, {
            content: string;
            password: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        providerId: string;
        providerContent: {
            content: string;
            password: string;
        };
    }, {
        providerId: string;
        providerContent: {
            content: string;
            password: string;
        };
    }>;
    /**
     *
     */
    const UserRegisterPost: z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
        register_code: z.ZodOptional<z.ZodString>;
        invitation_code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        password?: string | undefined;
        register_code?: string | undefined;
        invitation_code?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        password?: string | undefined;
        register_code?: string | undefined;
        invitation_code?: string | undefined;
    }>;
    /**
     *
     */
    const UserRegisterCodeGet: z.ZodObject<{
        type: z.ZodEnum<["email", "phone"]>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        type: "email" | "phone";
    }, {
        value: string;
        type: "email" | "phone";
    }>;
    const UserRegisterSimple: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        email: string;
    }, {
        password: string;
        email: string;
    }>;
    const RequestNewOrder: z.ZodObject<{
        planId: z.ZodNumber;
        priceId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        planId: number;
        priceId: number;
    }, {
        planId: number;
        priceId: number;
    }>;
}
//# sourceMappingURL=request.d.ts.map