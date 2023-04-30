import puppeteer from 'puppeteer';
import { CGTNText } from 'CGTNText';
import { CGTNParagraph } from 'CGTN-paragraph';

async function CGTNTrending() {
    let concatString = ''
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto(link);

    const titles = await page.evaluate(() => {
        const bottomNewsContainer = document.querySelector('.hot-news-item').textContent.trim();
        const links = bottomNewsContainer.querySelectorAll('h4');
        links.shift();
        return links;
    });

    for (i = 0; i < titles.length; i++){
        concatString = concatString + '<h2>' + CGTNText(titles[i]) + '</h2>';
        concatString = concatString + '<p>' +  CGTNParagraph(titles[i]) + '</p>';
    }

    await browser.close();
    return concatString
}