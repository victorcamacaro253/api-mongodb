// models/userModels.js
import connectDB from '../db/mongoClient.js';
import { ObjectId } from 'mongodb';

let db; // Variable para almacenar la conexión

// Inicializar la conexión si aún no está configurada
async function initializeDb() {
  try {
    if (!db) {
      db = await connectDB(); // Usar la conexión existente
      console.log('Conexión a la base de datos inicializada en el modelo');
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    throw error;
  }
}

// Ejecutar la inicialización al cargar el módulo
await initializeDb();

class UserModel  {
 static async getAllUsers() {
    try {
      const users = await db.collection('users').find({}).toArray();
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new Error('Error al obtener usuarios');
    }
  }


   static  async getUserById(id) {
    try {
        const user = await db.collection('users').findOne({ _id:new ObjectId (id) });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return user;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw new Error('Error al obtener usuario');
            }
        }

      static  async existingCedula(cedula){
            const results= await db.collection('users').findOne({ cedula });
            return results; 
        }
    

        static async  createUser(name,apellido, cedula,email, password) {
            try {
                const result = await db.collection('users').insertOne({nombre: name,
                    apellido,
                    cedula,
                    email,
                    password});
                return result
                } catch (error) {
                    console.error('Error al crear usuario:', error);
                    throw new Error('Error al crear usuario');
                    }
                    }



   static  async updateUser(id,updateFields) {
    try {
        const result = await db.collection('users').updateOne({ _id: new ObjectId(id)
            },
            {   $set:  updateFields  }   );
                    return result
                    } catch (error) {
                        console.error('Error al actualizar usuario:', error);
                        throw new Error('Error al actualizar usuario');
               }

        }

        static async deleteUser (id){
            try {

                const result= await db.collection('users').deleteOne({_id: new ObjectId(id)})
                return result;
                
            } catch (error) {
                console.error('Error al eliminar al usuario',error)
                throw new Error(error)
                
            }
        }


};

export default UserModel;
