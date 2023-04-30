// import puppeteer from 'puppeteer';

// (async() => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('https://www.bbc.com/');

//     // Set screen size
//     await page.setViewport({ width: 1080, height: 1024 });

//     // const html = page.content()

//     const firstTitle = await page.$x('/html/body/div[7]/div/section[3]/div/ul/li[1]/div/div[2]/h3/a/text()').getProperty('textContent');
//     console.log(firstTitle);

//     //   // Type into search box
//     //   await page.type('.search-box__input', 'automate beyond recorder');

//     //   // Wait and click on first result
//     //   const searchResultSelector = '.search-box__link';
//     //   await page.waitForSelector(searchResultSelector);
//     //   await page.click(searchResultSelector);

//     //   // Locate the full title with a unique string
//     //   const textSelector = await page.waitForSelector(
//     //     'text/Customize and automate'
//     //   );
//     //   const fullTitle = await textSelector.evaluate(el => el.textContent);

//     //   // Print the full title
//     //   console.log('The title of this blog post is "%s".', fullTitle);

//     await browser.close();
// })();

import puppeteer from 'puppeteer';

async function main() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto("https://en.wikipedia.org/wiki/Web_scraping");

    const title = await page.evaluate(() => {
        return document.querySelector("#firstHeading").textContent.trim();
    });
    console.log(title);

    await browser.close();
}
main();