// Controlador para crear un nuevo carrito
exports.createCart = async (req, res) => {
    try {
        const newCart = await Cart.create(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un carrito por su ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para actualizar un carrito por su ID
exports.updateCartById = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para eliminar un carrito por su ID
exports.deleteCartById = async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json({ message: 'Carrito eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
