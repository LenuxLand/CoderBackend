const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const productsRouter = express.Router();

// Ruta raíz GET /api/products
productsRouter.get('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    res.json(products);
  } catch (error) {
    console.error('Error al leer los productos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta GET /api/products/:pid
productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    const product = products.find(product => product.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta raíz POST /api/products
productsRouter.post('/', (req, res) => {
  try {
    const newProduct = req.body;
    newProduct.id = uuidv4(); // Generar un nuevo ID para el producto
    const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    products.push(newProduct);
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    res.json(newProduct);
  } catch (error) {
    console.error('Error al agregar el producto:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta PUT /api/products/:pid
productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
      res.json(products[index]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta DELETE /api/products/:pid
productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    const filteredProducts = products.filter(product => product.id !== productId);
    if (filteredProducts.length < products.length) {
      fs.writeFileSync('products.json', JSON.stringify(filteredProducts, null, 2));
      res.json({ message: 'Producto eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = productsRouter;
