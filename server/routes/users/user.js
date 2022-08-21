import express from 'express';
import { getUser, createUser, deleteUser, updateUser, addPurchase } from '../../controllers/users/user.js';

const router = express.Router();

router.get('/:id', getUser);
router.post('/', createUser)
router.delete('/:id', deleteUser);
router.patch('/purchase', addPurchase);
router.patch('/:id', updateUser);

export default router;