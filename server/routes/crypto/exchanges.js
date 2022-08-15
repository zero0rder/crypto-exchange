import express from 'express';
import { getExchanges, getExchangeInfo } from '../../controllers/crypto/exchanges.js';

const router = express.Router();

router.get('/:limit', getExchanges);
router.get('/info/:id', getExchangeInfo);

export default router;