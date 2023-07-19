import {getconnection} from "./../database/database"
//estoy sacando los datos directamente desde la base de datos
const getusers= async (req,res) =>{
    try {
        const connection = await getconnection();
    const result = await connection.query("SELECT id,name,lastname,email FROM users");
    console.log(result);
    res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}
const getuser= async (req,res) =>{
    try {
        console.log(req.params)
        const {id}=req.params
        const connection = await getconnection();
    const result = await connection.query("SELECT id,name,lastname,email FROM users WHERE id=?",id);
    //aqui le estoy diciendo que me muestre el resultado de la peticion en formato json
    res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const updateeuser= async (req,res) =>{
    try {
        console.log(req.params)
        const {id}=req.params
        const {name, lastname, email, dni}= req.body
        const usuarios ={id,name, lastname, email, dni}
        const connection = await getconnection();
    const result = await connection.query("UPDATE users SET ? WHERE id=?",[usuarios,id]);
    //aqui le estoy diciendo que me muestre el resultado de la peticion en formato json
    res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const deleteuser= async (req,res) =>{
    try {
        console.log(req.params)
        const {id}=req.params
        const connection = await getconnection();
    const result = await connection.query("DELETE FROM users WHERE id=?",id);
    //aqui le estoy diciendo que me muestre el resultado de la peticion en formato json
    res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const addusers= async (req,res) =>{
    try {
        const {name, lastname, email, dni}= req.body
        const usuarios ={name, lastname, email, dni}
        //estas son validaciones 
        if(name === undefined || lastname===undefined){
            res.status(400).json({message:"llene todos los campos por favor."})
        }
        //
        const connection = await getconnection();
        //estoy insertando en la tabla users los datos de usuarios
        const result = await connection.query("INSERT INTO users SET? ", usuarios)
        res.json({message:"usuario añadido correctamente"})

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
//esto sirve para exportar las funciones y usarlas en otros lados
export const methods={
 getusers,
 addusers,
 getuser,
 deleteuser,
 updateeuser
}