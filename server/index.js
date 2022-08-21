import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import CryptoRoutes from './routes/crypto/cryptocurrencies.js';
import ExchangeRoutes from './routes/crypto/exchanges.js';
import GlobalRoutes from './routes/crypto/globalMetrics.js';
import UserRoutes from './routes/users/user.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/cryptos', CryptoRoutes);
app.use('/exchanges', ExchangeRoutes);
app.use('/global', GlobalRoutes);
app.use('/users', UserRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
.catch(error => console.log(`${error} did not connect`));
