import express from 'express';
import fs from 'fs';
import { Server } from 'socket.io';

const router = express.Router();

// Ruta principal que muestra la vista home.handlebars
router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
  res.render('home', { products });
});

// Ruta para la vista realTimeProducts.handlebars
router.get('/realtimeproducts', (req, res) => {
  const products = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
  res.render('realTimeProducts', { products });
});

export default router;
