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
        const response = await fetch(`${baseUrl}/cryptocurrency/listings/latest?limit=${limit}`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        return console.error('server request failed: ', err);
    }

}

export const getCrypto = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`${baseUrl}/cryptocurrency/info?id=${id}`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        return console.error('server request failed: ', err);
    }
}