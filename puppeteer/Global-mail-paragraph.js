import puppeteer from 'puppeteer';

import { Configuration, OpenAIApi } from "openai";
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function main() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto("https://www.theglobeandmail.com/world/article-scores-of-world-figures-urge-putin-to-free-navalny-in-open-letter-2/");

    const paragraph = await page.evaluate(() => {
        const l_article = document.querySelector('.l-article');
        const node_list = l_article.querySelectorAll('.c-article-body__text.text-pr-5');
        let combinedText = "";

        for (let i = 0; i < node_list.length; i++) {
            combinedText += node_list[i].textContent.trim();
        }
        return combinedText;
    });

    fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'summarize in 50 words' + paragraph }],
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            const messageContent = data.choices[0].message.content;
            console.log(messageContent);
        })
        .catch(error => console.error(error));

    await browser.close();
}
main();