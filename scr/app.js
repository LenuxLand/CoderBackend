const express = require('express');
const ProductManager = require('./productmanager'); // Ajusta la ruta según la ubicación de tu archivo de ProductManager

const app = express();
const port = 3000;

const productManager = new ProductManager('products.json'); // Ajusta el nombre del archivo según tu configuración

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener producto por ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB establecida'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar el servidor de archivos estáticos
app.use(express.static('public'));

// Configurar el puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

io.on('connection', socket => {
  console.log('Un usuario se ha conectado');

  // Escuchar evento para crear un nuevo producto
  socket.on('crearProducto', producto => {
    // Aquí puedes guardar el producto en la base de datos o hacer cualquier otra acción necesaria
    // Después, puedes emitir un evento para actualizar la lista de productos en tiempo real
    io.emit('productoCreado', producto);
  });

  // Escuchar evento para eliminar un producto
  socket.on('eliminarProducto', productoId => {
    // Aquí puedes eliminar el producto de la base de datos o hacer cualquier otra acción necesaria
    // Después, puedes emitir un evento para actualizar la lista de productos en tiempo real
    io.emit('productoEliminado', productoId);
  });

  // Manejar la desconexión del usuario
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

const express = require('express');
const cartRoutes = require('./routes/cartRoutes');

// Usar las rutas para carritos
app.use('/api', cartRoutes);

// Otros middlewares y configuraciones...

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
