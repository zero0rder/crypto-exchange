import express from 'express';
import { getCryptos, getCrypto } from '../controllers/cryptocurrencies.js';

const router = express.Router();

router.get('/:limit', getCryptos);
router.get('/details/:id', getCrypto);

export default router;