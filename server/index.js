import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import { createClient } from 'redis';
import CryptoRoutes from './routes/crypto/cryptocurrencies.js';
import ExchangeRoutes from './routes/crypto/exchanges.js';
import GlobalRoutes from './routes/crypto/globalMetrics.js';
import UserRoutes from './routes/users/user.js';

//redis cache
const redis = new createClient({
    url: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PW
});

redis.on('error', (e) => console.error(e));
await redis.connect();

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/cryptos', getOrSetCache, CryptoRoutes);
app.use('/exchanges', ExchangeRoutes);
app.use('/global', getOrSetCache, GlobalRoutes);
app.use('/users', UserRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`server is running on port: ${PORT}`)))
.catch(error => console.log(`${error} did not connect`));

async function getOrSetCache(req, res, next){
    const { originalUrl } = req,
    cachedRes = await redis.get(originalUrl);

    if(cachedRes) {
        res.json(JSON.parse(cachedRes));
    } else {
        req.isCached = false;
        req.setCacheItem = async (data) => await redis.set(originalUrl, JSON.stringify(data), {
            EX: 3600, // cache duration (seconds)
            NX: true, // only set non-existent keys
        });

        next();
    }
}