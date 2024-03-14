"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.setUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
function setUser(user) {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        _email: user.email,
    }, secret);
}
exports.setUser = setUser;
function getUser(token) {
    if (!token)
        return null;
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (err) {
        console.log(err.message);
        return false;
    }
}
exports.getUser = getUser;
