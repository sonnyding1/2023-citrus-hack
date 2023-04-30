import puppeteer from 'puppeteer';

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.cgtn.com/news/2023-04-29/Major-sci-tech-facilities-open-in-China-s-Shenzhen-1jp4d9UNM0E/index.html');
    // await page.waitForSelector('figure.BodyImage img');
    const imageSrc = await page.$eval('.cmsImage img', img => img.src);
    console.log(imageSrc);
    await browser.close();
})();