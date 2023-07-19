import {getconnection} from "./../database/database"
const getcomentarios= async (req,res) =>{
    try {
        const connection = await getconnection();
    const result = await connection.query("SELECT datos,name FROM comentarios");
    console.log(result);
    res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const addcomentario= async (req,res) =>{
    try {
        const {datos,name}= req.body
        const atraccionescoments ={datos,name}
        const connection = await getconnection();
        //estoy insertando en la tabla users los datos de usuarios
        const result = await connection.query("INSERT INTO comentarios SET? ", atraccionescoments)
        res.json({message:"comentario añadido correctamente"})
        console.log(datos)
        console.log(req.body)

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const methods={
addcomentario,
getcomentarios
}