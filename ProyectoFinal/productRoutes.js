import express from 'express';
//import { Router } from 'express';
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js'


const router = express.Router();

const productManager = new ProductManager('./products.json');
const cartManager = new CartManager('./carts.json');


// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getAllProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);

  try {
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const product = req.body;

  try {
    const newProduct = await productManager.addProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  const updatedFields = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(pid, updatedFields);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
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


// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
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

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const addedProduct = await cartManager.addProductToCart(cid, pid);
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});


export default router