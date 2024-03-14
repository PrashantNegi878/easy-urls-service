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
    return __awaiter(this, void 0, void 0, function* () {
        const fullToken = req.headers.authorization;
        if (!fullToken)
            return res.status(400).json({ message: constants_1.MISSING_UID });
        const token = fullToken === null || fullToken === void 0 ? void 0 : fullToken.split(' ')[1];
        const user = (0, auth_1.getUser)(token);
        if (!user)
            return res.status(400).json({ message: constants_1.VALIDATE_USER_FAILED });
        req.user = user;
        next();
    });
}
exports.default = validateUser;
