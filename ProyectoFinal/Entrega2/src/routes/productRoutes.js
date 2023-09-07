import { Router } from 'express';
import * as controller from '../controllers/productControllers.js';

const router = Router();

//Ruta para crear lista desde un archivo
router.post('/file', controller.createFileController);
//Ruta para traer todos los productos
router.get('/all', controller.getAllController);
//Ruta para traer un productos por su titulo
router.get('/title/:title', controller.getByTitleController);
//Ruta para traer un productos por su ID
router.get('/id/:id', controller.getByIdController);
//Ruta para traer un productos por su codigo
router.get('/code/:code', controller.getByCodeController);
//Ruta para crear un producto
router.post('/', controller.createController);
//Ruta para añadir un producto a un carrito por su ID
router.post('/add/:idProduct/:idCart', controller.addProductToCart); 
//Ruta para actualizar un producto por su ID
router.put('/:id', controller.updateController);
//Ruta para eliminar un producto por su ID
router.delete('/:id', controller.deleteController);
//Ruta para traer productos con filtro, agrupamiento y ordenamiento
router.get('/ag/aggregation1', controller.aggregation1)

export default router;