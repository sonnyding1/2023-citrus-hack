import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto("https://news.cgtn.com/news/2023-04-29/China-opens-first-space-science-popularization-exhibition-1jp3j7nOVoc/index.html");

    const title = await page.evaluate(() => {
        return document.querySelector('.news-title').textContent.trim();
    });

    console.log(title);

    await browser.close();
}
main();