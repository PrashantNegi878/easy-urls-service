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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserLogin = exports.handleUserSignup = void 0;
const constants_1 = require("../constants");
const users_1 = __importDefault(require("../models/users"));
const auth_1 = require("../service/auth");
function handleUserSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            let user = yield users_1.default.findOne({ email });
            if (user)
                return res.status(400).json({ message: constants_1.USER_ALREADY_EXISTS });
            user = yield users_1.default.create({ name, email, password });
            const token = (0, auth_1.setUser)(user);
            return res.status(201).json({ message: constants_1.USER_CREATED_MESSAGE, userName: user.name, token });
        }
        catch (err) {
            return res.status(500).json({ message: constants_1.USER_NOT_CREATED_MESSAGE });
        }
    });
}
exports.handleUserSignup = handleUserSignup;
function handleUserLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield users_1.default.findOne({ email, password });
            if (!user)
                return res.status(400).json({ message: constants_1.INVALID_USER_DATA });
            const token = (0, auth_1.setUser)(user);
            return res.status(200).json({ message: constants_1.FETCHD_USER_DATA, userName: user.name, token: token });
        }
        catch (err) {
            return res.status(500).json({ message: constants_1.FAILED_FETCH_USER });
        }
    });
}
exports.handleUserLogin = handleUserLogin;
