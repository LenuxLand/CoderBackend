// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Endpoint para crear un nuevo carrito
router.post('/carritos', cartController.createCart);

// Endpoint para obtener un carrito por su ID
router.get('/carritos/:id', cartController.getCartById);

// Endpoint para actualizar un carrito por su ID
router.put('/carritos/:id', cartController.updateCartById);

// Endpoint para eliminar un carrito por su ID
router.delete('/carritos/:id', cartController.deleteCartById);

module.exports = router;
