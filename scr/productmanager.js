const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.nextId = 1;
  }

  addProduct(product) {
    try {
      const products = this.getProductsFromStorage();

      // Asignar un id autoincrementable
      product.id = this.nextId++;
      products.push(product);

      this.saveProductsToStorage(products);

      console.log(`Producto agregado: ${JSON.stringify(product)}`);
    } catch (error) {
      console.error('Error al agregar el producto:', error.message);
    }
  }

  getProducts() {
    try {
      return this.getProductsFromStorage();
    } catch (error) {
      console.error('Error al obtener los productos:', error.message);
      return [];
    }
  }

  getProductById(id) {
    try {
      const products = this.getProductsFromStorage();
      const foundProduct = products.find((product) => product.id === id);

      if (foundProduct) {
        return foundProduct;
      } else {
        console.error('Producto no encontrado');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error.message);
      return null;
    }
  }

  updateProduct(id, updatedProduct) {
    try {
      let products = this.getProductsFromStorage();
      const existingProductIndex = products.findIndex((product) => product.id === id);

      if (existingProductIndex !== -1) {
        // No se debe borrar el ID, simplemente se actualizan los campos
        products[existingProductIndex] = { ...products[existingProductIndex], ...updatedProduct };

        this.saveProductsToStorage(products);

        console.log(`Producto actualizado: ${JSON.stringify(products[existingProductIndex])}`);
      } else {
        console.error('Producto no encontrado para actualizar');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
    }
  }

  deleteProduct(id) {
    try {
      let products = this.getProductsFromStorage();
      const filteredProducts = products.filter((product) => product.id !== id);

      if (filteredProducts.length < products.length) {
        this.saveProductsToStorage(filteredProducts);
        console.log(`Producto eliminado con éxito (ID: ${id})`);
      } else {
        console.error('Producto no encontrado para eliminar');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
  }

  getProductsFromStorage() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  saveProductsToStorage(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}

// Ejemplo de uso
const productManager = new ProductManager('products.json');

const product1 = {
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 19.99,
  thumbnail: '/path/to/image1.jpg',
  code: 'P001',
  stock: 50,
};

const product2 = {
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 29.99,
  thumbnail: '/path/to/image2.jpg',
  code: 'P002',
  stock: 30,
};

// Agregar productos
productManager.addProduct(product1);
productManager.addProduct(product2);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productIdToSearch = 2;
const productById = productManager.getProductById(productIdToSearch);
console.log('Producto por ID:', productById);

// Actualizar un producto
const productIdToUpdate = 1;
const updatedProduct = {
  price: 24.99,
  stock: 40,
};
productManager.updateProduct(productIdToUpdate, updatedProduct);

// Eliminar un producto
const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);
