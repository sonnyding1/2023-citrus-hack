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
    await page.goto("https://news.cgtn.com/news/2023-04-29/China-opens-first-space-science-popularization-exhibition-1jp3j7nOVoc/index.html");

    const paragraph = await page.evaluate(() => {
        return document.querySelector('.text.en').textContent.trim();
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