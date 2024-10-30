import userModel from  '../models/userModels.js';
import { hash } from 'bcrypt';
import { ObjectId } from 'mongodb';

class userController{
    

static getAllUsers = async (req, res) => {
    // res.header('Access-Control-Allow-Origin','*')
     try {
 
         const results = await userModel.getAllUsers();

         if (!results) {
            return res.status(404).json({ message: "No users found" });
            
         }
         res.json(results);
     } catch (err) {
         console.error('Error ejecutando la consulta:', err);
         res.status(500).json({ error: 'Error interno del servidor 1' });
     }
 };



 static getUserById= async (req,res)=>{
    try{
        const {id} = req.params;
        const results = await userModel.getUserById(id);
        if(!results){
            return res.status(404).json({message:"User not found"})
            }
            res.json(results);
            }catch(error){
                console.error('Error ejecutando la consulta:', error);
                res.status(500).json({ error: 'Error interno del servidor 2' });
                }
                
 }

static  createUser = async (req, res) => {
    try {
        const { name,apellido,cedula, email, password } = req.body;

       const existingUser= await userModel.existingCedula(cedula)

       if(existingUser){
        return res.status(400).json({message:"El usuario ya existe"})

       }
console.log(apellido)
        const results = await userModel.createUser(name,apellido, cedula,email, password);
        res.json(results);
        } catch (error) {
            console.error('Error ejecutando la consulta:', error);
            res.status(500).json({ error: 'Error interno del servidor 3' });
            }

}


 static  updateUser = async (req, res) => {
   
        const { id } = req.params;
        const { name,apellido,cedula, email, password } = req.body;


        // Validar si no se envió ningún dato para actualizar
    if (!name && !apellido && !cedula && !email && !password) {
        return res.status(400).json({ error: 'No hay datos para actualizar' });
      }
  
      try {
        let updateFields={}

        if(name) updateFields.nombre= name;
        if(apellido) updateFields.apellido=apellido;
        if(cedula)  updateFields.cedula= cedula

       if(email) updateFields.email= email
       if(password){
        const hashedPassword = await hash(password,10)
        updateFields.password=hashedPassword
       }

       // Validar si el ID tiene un formato válido
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }


        const results = await userModel.updateUser(id, updateFields);


      if (results.matchedCount === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }


            res.json(results);
            } catch (error) {
                console.error('Error ejecutando la consulta:', error);
                res.status(500).json({ error: 'Error interno del servidor 4' });
                }

            }


            static deleteUser= async (req,res)=>{
                const {id} = req.params

                // Validar si el ID tiene un formato válido
           if (!ObjectId.isValid(id)) {
              return res.status(400).json({ error: 'ID inválido' });
               }

                try {

                    const result= await userModel.deleteUser(id)

                    if(result.deleteCount=== 0){
                        return res.status(400).json({error:'Usuario no encontrado'})
                    }

                    res.json({message:'Usuario eliminado'})

                    
                } catch (error) {
                    
                }
            }

}

export default userController