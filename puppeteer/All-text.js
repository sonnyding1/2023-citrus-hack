import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto("https://news.cgtn.com/news/2023-04-30/China-sees-travel-rush-tourism-boom-as-5-day-Labor-Day-holiday-starts-1jpOaa7JJx6/index.html");

    const title = await page.evaluate(() => {
        return document.querySelector('h1').textContent.trim();
    });

    console.log(title);

    await browser.close();
}
main();