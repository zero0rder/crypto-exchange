import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import CryptoRoutes from './routes/cryptocurrencies.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/cryptos', CryptoRoutes);
// app.use('/exchanges', /* ROUTES */);
// app.use('/global', /* ROUTES */);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
