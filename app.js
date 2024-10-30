import express from 'express';
import userRoutes  from './routes/usersRoutes.js';
import cors from  'cors';


  const app = express();
  const PORT = 3002;
  
  app.use(express.json());

  app.disable('x-powered-by')

 app.use(cors())

  app.use('/users', userRoutes); // Rutas para usuarios
  
  app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });