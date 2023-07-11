"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dalErrorCatcher = void 0;
const client_1 = require("@prisma/client");
const types_1 = require("@caw/types");
function dalErrorCatcher(target, _context // // FIXME give a correct type ClassMethodDecoratorContext
) {
    /* Get all class methods */
    const methods = Object.getOwnPropertyNames(target.prototype).filter((prop) => typeof target.prototype[prop] === "function" && prop !== "constructor");
    methods.forEach((methodName) => {
        const originalMethod = target.prototype[methodName];
        target.prototype[methodName] = async function (...args) {
            try {
                return await originalMethod.apply(this, args);
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    switch (error.code) {
                        case "P2002" /* Unique constraint failed on the {constraint} */:
                            console.error(`Error occurred in method ${methodName}: `, error);
                            break;
                        case "P2025":
                            throw new types_1.ServerError(types_1.serverStatus.notExist, "Query does not exist");
                        default:
                            throw error;
                    }
                }
                throw error;
            }
        };
    });
}
exports.dalErrorCatcher = dalErrorCatcher;
