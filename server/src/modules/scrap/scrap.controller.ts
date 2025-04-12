import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../utils/asyncHandler";
import ApiResponse from "../../utils/apiResponse";
import puppeteer from "puppeteer";

const initializeScrap = asyncHandler(async (req: Request, res: Response) => {
  const incomming = req.body;
  const data = incomming.formData;
  console.log(req.body, "req.body");
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production",
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(data?.siteUrl, { waitUntil: "domcontentloaded" });

  const selectorTypeFormat =
    data?.selectorType === "id" ? `#${data?.selector}` : `.${data?.selector}`;

  const quotes = await page.evaluate((selectorTypeFormat) => {
    const quoteNodes = document.querySelectorAll(selectorTypeFormat);
    return Array.from(quoteNodes).map((quote) => {
      const text = quote?.querySelector(".text")?.innerHTML;
      const author = quote?.querySelector(".author")?.innerHTML;
      return { text, author };
    });
  }, selectorTypeFormat);

  await browser.close();

  return res.json(
    new ApiResponse(StatusCodes.OK, { quotes }, "Scraping complete!"),
  );
});

export const scrapController = { initializeScrap };
