"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverStatus = void 0;
var serverStatus;
(function (serverStatus) {
    serverStatus[serverStatus["success"] = 0] = "success";
    serverStatus[serverStatus["failed"] = 1] = "failed";
    serverStatus[serverStatus["unknownError"] = 2] = "unknownError";
    /* Authentication */
    serverStatus[serverStatus["authFailed"] = 3] = "authFailed";
    serverStatus[serverStatus["invalidCode"] = 4] = "invalidCode";
    serverStatus[serverStatus["wrongPassword"] = 5] = "wrongPassword";
    serverStatus[serverStatus["invalidToken"] = 6] = "invalidToken";
    serverStatus[serverStatus["invalidTicket"] = 7] = "invalidTicket";
    serverStatus[serverStatus["unScannedTicket"] = 8] = "unScannedTicket";
    /* Rate Limit*/
    serverStatus[serverStatus["tooFast"] = 9] = "tooFast";
    serverStatus[serverStatus["tooMany"] = 10] = "tooMany";
    serverStatus[serverStatus["notEnoughChances"] = 11] = "notEnoughChances";
    /* Content Safe */
    serverStatus[serverStatus["contentBlock"] = 12] = "contentBlock";
    serverStatus[serverStatus["contentNotSafe"] = 13] = "contentNotSafe";
    /* General */
    serverStatus[serverStatus["notExist"] = 14] = "notExist";
    serverStatus[serverStatus["userNotExist"] = 15] = "userNotExist";
    serverStatus[serverStatus["alreadyExisted"] = 16] = "alreadyExisted";
    serverStatus[serverStatus["userAlreadyExisted"] = 17] = "userAlreadyExisted";
})(serverStatus = exports.serverStatus || (exports.serverStatus = {}));
