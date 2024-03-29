"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlSchema = new mongoose_1.default.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: String } }],
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });
const URL = mongoose_1.default.model("urls", urlSchema);
exports.default = URL;
