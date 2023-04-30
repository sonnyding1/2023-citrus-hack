import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'tell a story!' }],
            temperature: 0.7
        })
    })
    .then(response => response.json())
    .then(data => {
        const messageContent = data.choices[0].message.content;
        console.log(messageContent);
    })
    .catch(error => console.error(error));