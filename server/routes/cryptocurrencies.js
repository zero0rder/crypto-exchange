import express from 'express';
import { getCryptos, getCryptoInfo, getCryptoQuote, getGlobalCryptoData } from '../controllers/cryptocurrencies.js';

const router = express.Router();

router.get('/global', getGlobalCryptoData);
router.get('/:limit', getCryptos);
router.get('/info/:id', getCryptoInfo);
router.get('/quotes/:id', getCryptoQuote);

export default router;