import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();

const productManager = new ProductManager('products.json');

router.get('/', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.render('realTimeProducts', { products });
});

export default (io) => {
  // Configurar el socket.io
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Emitir la lista de productos al cliente conectado
    socket.emit('products', async () => {
      const products = await productManager.getAllProducts();
      return products;
    });

    // Escuchar el evento de agregar un producto
    socket.on('addProduct', async (product) => {
      await productManager.addProduct(product);
      const updatedProducts = await productManager.getAllProducts();
      io.emit('products', updatedProducts);
    });

    // Escuchar el evento de eliminar un producto
    socket.on('deleteProduct', async (productId) => {
      await productManager.deleteProduct(productId);
      const updatedProducts = await productManager.getAllProducts();
      io.emit('products', updatedProducts);
    });
  });

  return router;
};
