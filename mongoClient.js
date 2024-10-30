// db/mongoClient.js
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // Variable para almacenar la referencia de la base de datos

// Conectar y devolver la referencia a la base de datos
async function connectDB() {
  try {
    if (!db) { // Evitar reconectar si ya existe una conexión
      await client.connect();
      db = client.db('victor'); // Almacenar la referencia
      console.log('Conexión exitosa a MongoDB Atlas!');
    }
    return db; // Devolver la instancia de la base de datos
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    throw error;
  }
}

export default connectDB;
