import express from 'express';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';

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
