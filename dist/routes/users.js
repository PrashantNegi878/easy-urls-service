"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
exports.router = (0, express_1.Router)();
exports.router.post('/signup', users_1.handleUserSignup);
exports.router.post('/login', users_1.handleUserLogin);
