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

export const getExchanges = async (req, res) => {
    const { limit } = req.params;

    try {
        const response = await fetch(`${baseUrl}/v1/exchange/map?limit=${limit}&sort=volume_24h`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        throw new Error(`[Server request failed]: ${err}`);
    }

}

export const getExchangeInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`${baseUrl}/v1/exchange/info?id=${id}`, reqOptions);
        const data = await response.json();
        res.json(data);

    } catch(err) {
        throw new Error(`[Server request failed]: ${err}`);
    }

}