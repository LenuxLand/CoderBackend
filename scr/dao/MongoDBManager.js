const Product = require('./dao/models/Product');
const Cart = require('./dao/models/Cart');
const Message = require('./dao/models/Message');

// Funciones para interactuar con la base de datos

const MongoDBManager = {
    // Funciones para operaciones relacionadas con productos
    getAllProducts: async () => {
        return await Product.find();
    },
    getProductById: async (productId) => {
        return await Product.findById(productId);
    },
    addProduct: async (productData) => {
        const newProduct = new Product(productData);
        return await newProduct.save();
    },
    updateProduct: async (productId, updatedProductData) => {
        return await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
    },
    deleteProduct: async (productId) => {
        return await Product.findByIdAndDelete(productId);
    },

    // Funciones para operaciones relacionadas con carritos
    // Implementa operaciones similares para las colecciones de carritos y mensajes
};

module.exports = MongoDBManager;
