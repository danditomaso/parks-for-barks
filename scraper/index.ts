import puppeteer from "puppeteer";

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setUserAgent(
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0"
);
await page.goto(
  "https://www.toronto.ca/community-people/animals-pets/pets-in-the-city/dog-off-leash-areas/"
);

const buttonSelector = "button.accordion__button--expand";
await page.waitForSelector(buttonSelector);
await page.click(buttonSelector);
page.screenshot({ path: "example.png", fullPage: true });

await browser.close();
