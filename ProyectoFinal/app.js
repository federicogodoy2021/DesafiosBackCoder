const express = require('express');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

const app = express();
const port = 8080;

app.use(express.json());

// Rutas para los productos
app.use('/api/products', productRoutes);
// Rutas para los carritos
app.use('/api/carts', cartRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
