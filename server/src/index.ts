import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();
const db = drizzle(process.env.DATABASE_URL!);


console.log(db, "connection success or wot?");
