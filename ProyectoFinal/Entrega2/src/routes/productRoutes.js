import { Router } from 'express';
import * as controller from '../controllers/productControllers.js';

const router = Router();

router.post('/file', controller.createFileController);

router.get('/all', controller.getAllController);

router.get('/', controller.getByTitleController);

router.get('/id/:id', controller.getByIdController);

router.get('/code/:code', controller.getByCodeController);

router.post('/', controller.createController);

router.post('/add/:idProduct/:idCart', controller.addProductToCart); 

router.put('/:id', controller.updateController);

router.delete('/:id', controller.deleteController);

export default router;