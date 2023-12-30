class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(product) {
      // Validar que todos los campos obligatorios estén presentes
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error('Todos los campos son obligatorios.');
        return;
      }
  
      // Validar que el código no esté repetido
      if (this.products.some((p) => p.code === product.code)) {
        console.error('Ya existe un producto con el mismo código.');
        return;
      }
  
      // Asignar un id autoincrementable
      const productId = this.productIdCounter++;
      const newProduct = { id: productId, ...product };
      this.products.push(newProduct);
      console.log(`Producto agregado: ${JSON.stringify(newProduct)}`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const foundProduct = this.products.find((product) => product.id === id);
  
      if (foundProduct) {
        return foundProduct;
      } else {
        console.error('Producto no encontrado');
        return null;
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
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
  
  productManager.addProduct(product1);
  productManager.addProduct(product2);
  
  const allProducts = productManager.getProducts();
  console.log('Todos los productos:', allProducts);
  
  const productIdToSearch = 2;
  const productById = productManager.getProductById(productIdToSearch);
  