import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;
const baseUrl = process.env.BASE_URL;

const reqOptions = {
    method: 'GET',
    headers: {
        "X-CMC_PRO_API_KEY": apiKey
    }
}

export const getGlobalCryptoData = async (req, res) => {
    try {
        const response = await fetch(`${baseUrl}/v1/global-metrics/quotes/latest`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        return console.error('server request failed: ', err);
    }
}