"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), "env") });
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    // secret:process.env.SECRET,
    // salt:process.env.SALT,
    // jwt:process.env.JWT,
    // cors:process.env.CORS,
};
