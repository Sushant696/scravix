"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
dotenv_1.default.config();
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
console.log(db, "connection success or wot?");
