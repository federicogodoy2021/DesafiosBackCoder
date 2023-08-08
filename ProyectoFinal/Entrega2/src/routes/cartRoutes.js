import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js'

const router = Router();

router.post('/', controller.createCart);     

router.get('/:id', controller.getByIdCart);


export default router;

