import puppeteer from 'puppeteer';

(async() => {
    // Launch a new browser instance
    const browser = await puppeteer.launch();

    // Create a new page object
    const page = await browser.newPage();

    // Navigate to the target web page
    await page.goto('https://www.cnn.com/travel/article/italy-messina-bridge-sicily-intl/index.html');


    const imgSrcList = await page.$eval('.layout__wrapper.layout-with-rail__wrapper img', imgs => {
        return imgs.src;
    });
    console.log(imgSrcList);


    await browser.close();
})();