/*import express from 'express';
import  connectDB  from './db/mongoClient.js';
import usersRoutes from  './routes/usersRoutes.js';

const app = express();
const port = process.env.PORT || 3002;

let db;

connectDB()
  .then(database => {
    db = database;

    // Middleware
    app.use(express.json());

    // Ruta para obtener los usuarios de la colección "usuarios"
   /* app.get('/usuarios', async (req, res) => {
      try {
        const usuarios = await db.collection('users').find().toArray(); // Cambia 'usuarios' por tu colección
        res.status(200).json(usuarios);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
      }
    });

    // Rutas
    app.use('/users', usersRoutes(db));

    // Ruta raíz
    app.get('/', (req, res) => {
      res.send('¡Hola Mundo!');
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor en ejecución en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al iniciar el servidor:', err);
  });

  */
  import express from 'express';
import userRoutes  from './routes/usersRoutes.js';

  const app = express();
  const PORT = 3002;
  
  app.use(express.json());



  app.use('/users', userRoutes); // Rutas para usuarios
  
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });