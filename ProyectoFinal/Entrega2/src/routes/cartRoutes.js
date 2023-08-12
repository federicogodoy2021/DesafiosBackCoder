import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js'

const router = Router();
//Ruta para crear un nuevo carrito
router.post('/', controller.createCart);     
//Ruta para traer un carrito por su ID
router.get('/:id', controller.getByIdCart);
//Ruta para traer productos con filtro, agrupamiento y ordenamiento
router.get('/ag/aggregation1', controller.aggregation1)
//Ruta para Actualizar los carritos añadiendo fecha random
router.put('/updatedocs', controller.updateNewDate)

export default router;

