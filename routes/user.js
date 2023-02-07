import express from 'express';
const router = express.Router();

import { userController } from '../controllers/';

router.get('/', userController.getAll);
router.get('/:id', userController.get);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
