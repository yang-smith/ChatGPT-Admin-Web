"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    errorCode;
    constructor(code, message) {
        /* Call the constructor method of the parent class and pass the message parameter */
        super(message);
        /* Ensure that this points to the correct */
        Object.setPrototypeOf(this, ServerError.prototype);
        /* Save the class name in the stack trace */
        this.name = this.constructor.name;
        /* Add custom properties*/
        this.errorCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ServerError = ServerError;
