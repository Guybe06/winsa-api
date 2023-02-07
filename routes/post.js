import express from 'express';
const router = express.Router();

import { postController } from '../controllers/';

router.get('/', postController.getAll);
router.get('/:id', postController.get);
router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);
router.delete('/s/:id', postController.deleteMany);

export default router;
