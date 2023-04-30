import puppeteer from 'puppeteer';

async function CGTNText(link) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto(link);

    const title = await page.evaluate(() => {
        return document.querySelector('.news-title').textContent.trim();
    });

    console.log(title);

    await browser.close();
}