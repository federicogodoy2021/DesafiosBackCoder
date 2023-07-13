import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();

const productManager = new ProductManager('products.json');

//Listar todos los productos guardados
router.get('/', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.render('home', { products });
});

// Listar todos los productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getAllProducts();
  res.render('realTimeProducts', { products });
});

// Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);

  try {
    const deletedProduct = await productManager.deleteProduct(pid);
    res.json(deletedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


export default (io) => {
  
  // Configurar el socket.io
    io.on('connection', (socket) => {
    console.log('Cliente conectado!', socket.id);

    socket.on('disconnect', ()=>{
      console.log('Cliente desconectado!', socket.id);
  })
  
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
      socket.emit('products', updatedProducts);
      io.emit('products', updatedProducts);
    });
  });

  return router;
};