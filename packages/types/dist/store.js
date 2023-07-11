"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreType = void 0;
var StoreType;
(function (StoreType) {
    let SubmitKey;
    (function (SubmitKey) {
        SubmitKey["Enter"] = "Enter";
        SubmitKey["CtrlEnter"] = "Ctrl + Enter";
        SubmitKey["ShiftEnter"] = "Shift + Enter";
        SubmitKey["AltEnter"] = "Alt + Enter";
        SubmitKey["MetaEnter"] = "Meta + Enter";
    })(SubmitKey = StoreType.SubmitKey || (StoreType.SubmitKey = {}));
    let Theme;
    (function (Theme) {
        Theme["Auto"] = "auto";
        Theme["Dark"] = "dark";
        Theme["Light"] = "light";
    })(Theme = StoreType.Theme || (StoreType.Theme = {}));
})(StoreType = exports.StoreType || (exports.StoreType = {}));
