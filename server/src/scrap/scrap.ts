import puppeteer from "puppeteer";

const getProject = async () => {
  // lunching browser with new page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // now on this new page start scraping
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  // getting the actual data now
  const quotes = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    console.log(quotes, "quotes");
    return Array.from(quotes).map((quote) => {
      const text = quote?.querySelector(".text")?.innerHTML;
      const author = quote?.querySelector(".author")?.innerHTML;
      console.log(text, "->", author);
      return { text, author };
    });
  });

  await browser.close();
};



export default getProject;
