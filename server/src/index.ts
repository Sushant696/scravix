import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import getProject from "./scrap/scrap";

dotenv.config();
const db = drizzle(process.env.DATABASE_URL!);

console.log("connection success or wot?");

// getProject();
