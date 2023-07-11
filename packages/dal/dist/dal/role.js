"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDAL = void 0;
const database_1 = __importDefault(require("@caw/database"));
class RoleDAL {
    constructor() { }
    async getRoles() {
        return await database_1.default.role.findMany();
    }
}
exports.RoleDAL = RoleDAL;
