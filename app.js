import express from 'express';
import userRoutes  from './routes/usersRoutes.js';

  const app = express();
  const PORT = 3002;
  
  app.use(express.json());



  app.use('/users', userRoutes); // Rutas para usuarios
  
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });