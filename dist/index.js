"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const url_1 = require("./routes/url");
const db_config_1 = __importDefault(require("./db-config"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
(0, db_config_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.use("/url", url_1.router);
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
