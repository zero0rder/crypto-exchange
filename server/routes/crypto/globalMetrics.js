import express from 'express';
import { getGlobalCryptoData } from '../../controllers/crypto/globalMetrics.js';

const router = express.Router();

router.get('/', getGlobalCryptoData);

export default router;