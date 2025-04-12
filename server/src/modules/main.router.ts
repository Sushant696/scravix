import { Router } from "express";
import { scrapRouter } from "./scrap/scrap.router";

const mainRouter = Router();

mainRouter.use("/scrap", scrapRouter);

export default mainRouter;
