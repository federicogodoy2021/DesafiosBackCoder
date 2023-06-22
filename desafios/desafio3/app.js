const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

// Crear una instancia de ProductManager
const productManager = new ProductManager("./products.json");

// Endpoint para obtener todos los productos o un número limitado de productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtener el límite de resultados de los query params
    const products = await productManager.getProducts(); // Obtener todos los productos

    // Si se especifica un límite, devolver solo el número solicitado de productos
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

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);

  try {
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
