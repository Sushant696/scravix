import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import mainRouter from "./modules/main.router";

dotenv.config();

export const app = express();

app.use(bodyParser.json());

const corsOption = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOption));

const db = drizzle(process.env.DATABASE_URL!);
app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello from Drizzle + Express ☔");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
