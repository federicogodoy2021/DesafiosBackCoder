import './db/connection.js';
import express from 'express';
import morgan from 'morgan';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(morgan('dev'));

app.use('/products', productRouter);
app.use('/carts', cartRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

