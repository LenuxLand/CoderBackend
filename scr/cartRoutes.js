const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const cartsRouter = express.Router();

// Ruta raíz POST /api/carts
cartsRouter.post('/', (req, res) => {
  try {
    const newCart = { id: uuidv4(), products: [] };
    fs.writeFileSync('carts.json', JSON.stringify(newCart, null, 2));
    res.json(newCart);
  } catch (error) {
    console.error('Error al crear el carrito:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta GET /api/carts/:cid
cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  try {
    const carts = JSON.parse(fs.readFileSync('carts.json', 'utf8'));
    if (carts.id === cartId) {
      res.json(carts);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el carrito:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    let carts = JSON.parse(fs.readFileSync('carts.json', 'utf8'));
    if (carts.id === cartId) {
      const existingProductIndex = carts.products.findIndex(product => product.id === productId);
      if (existingProductIndex !== -1) {
        carts.products[existingProductIndex].quantity++;
      } else {
        carts.products.push({ id: productId, quantity: 1 });
      }
      fs.writeFileSync('carts.json', JSON.stringify(carts, null, 2));
      res.json(carts);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = cartsRouter;
