import express from 'express';
import { getCryptos, getCryptoInfo, getCryptoQuote } from '../controllers/cryptocurrencies.js';

const router = express.Router();

router.get('/:limit', getCryptos);
router.get('/info/:id', getCryptoInfo);
router.get('/quotes/:id', getCryptoQuote);

export default router;