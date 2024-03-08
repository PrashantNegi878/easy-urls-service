"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const auth_1 = require("../service/auth");
function validateUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const uid = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.uid;
        if (!uid)
            return res.status(400).json({ message: constants_1.MISSING_UID });
        const user = (0, auth_1.getUser)(uid);
        if (!user)
            return res.status(400).json({ message: constants_1.VALIDATE_USER_FAILED });
        req.user = user;
        next();
    });
}
exports.default = validateUser;
