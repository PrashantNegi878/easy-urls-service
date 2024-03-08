"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const url_1 = require("../controllers/url");
exports.router = express_1.default.Router();
exports.router.post('/', url_1.generateShortURL);
exports.router.get('/analytics', url_1.handleAnalytics);
exports.router.get('/adminAnalytics', url_1.handleAllAnalytics);
exports.router.get('/:shortId', url_1.handleRedirect);
