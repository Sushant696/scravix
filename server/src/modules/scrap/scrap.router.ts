import { Router } from "express";
import { scrapController } from "./scrap.controller";

export const scrapRouter = Router();

scrapRouter.post("/req", scrapController.initializeScrap);
