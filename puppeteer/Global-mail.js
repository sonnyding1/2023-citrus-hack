import puppeteer from 'puppeteer';

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.theglobeandmail.com/world/article-scores-of-world-figures-urge-putin-to-free-navalny-in-open-letter-2/');
    // await page.waitForSelector('figure.BodyImage img');
    const imageSrc = await page.$eval('.l-media img', img => img.src);
    console.log(imageSrc);
    await browser.close();
})();