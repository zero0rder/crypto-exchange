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

export const getCryptos = async (req, res) => {
    const { limit } = req.params;

    try {
        const response = await fetch(`${baseUrl}/v1/cryptocurrency/listings/latest?limit=${limit}`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        return console.error('server request failed: ', err);
    }

}

export const getCryptoInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`${baseUrl}/v1/cryptocurrency/info?id=${id}`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        return console.error('server request failed: ', err);
    }
}


export const getCryptoQuote = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`${baseUrl}/v2/cryptocurrency/quotes/latest?id=${id}`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        return console.error('server request failed: ', err);
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