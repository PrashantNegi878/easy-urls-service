"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const url_1 = require("./routes/url");
const users_1 = require("./routes/users");
const db_config_1 = __importDefault(require("./db-config"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
(0, db_config_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://easy-urls-ui.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use("/url", auth_1.default, url_1.router);
app.use("/user", users_1.router);
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
