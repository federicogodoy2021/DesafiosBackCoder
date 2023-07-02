const express = require('express');
const CartManager = require('./CartManager');

const router = express.Router();
const cartManager = new CartManager('./carts.json');

// Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Agregar productos al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    await cartManager.addProductToCart(cid, pid);
    res.status(201).json({ message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});
  
// Listar productos del carrito
  router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
  
    try {
      const cartProducts = await cartManager.getCartProducts(cid);
      res.json(cartProducts);
    } catch (error) {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  });
  

module.exports = router;
