import {getconnection} from "./../database/database"
//estoy sacando los datos directamente desde la base de datos
const getatraccions= async (req,res) =>{
    try {
        const connection = await getconnection();
    const result = await connection.query("SELECT id,name,img,direccion,caracteristica FROM atracciones");
    console.log(result);
    res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}
const getatraccion= async (req,res) =>{
    try {
        console.log(req.params)
        const {id}=req.params
        const connection = await getconnection();
    const result = await connection.query("SELECT id,name,img,direccion,caracteristica FROM atracciones WHERE id=?",id);
    //aqui le estoy diciendo que me muestre el resultado de la peticion en formato json
    res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const updateatraccion= async (req,res) =>{
    try {
        console.log(req.params)
        const {id}=req.params
        const {name, direccion,img,caracteristica}= req.body
        //aqui hago un desestructuring
        const atracciones ={id,name, direccion, img,caracteristica}
        const connection = await getconnection();
    const result = await connection.query("UPDATE atracciones SET ? WHERE id=?",[atracciones,id]);
    //aqui le estoy diciendo que me muestre el resultado de la peticion en formato json
    res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const deleteatraccion= async (req,res) =>{
    try {
        console.log(req.params)
        const {id}=req.params
        const connection = await getconnection();
    const result = await connection.query("DELETE FROM atracciones WHERE id=?",id);
    //aqui le estoy diciendo que me muestre el resultado de la peticion en formato json
    res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
    
}

const addatraccion= async (req,res) =>{
    try {
        const {name, direccion,img,caracteristica}= req.body
        const atracciones ={name, direccion,img,caracteristica}
        //
         const connection = await getconnection();
        const existname= await connection.query("SELECT * FROM atracciones WHERE name=?",name)
        if (existname.length > 0) {
            return res.json({ message: "El nombre ya existe" });
          }
          //
       
        //estoy insertando en la tabla users los datos de usuarios
        const result = await connection.query("INSERT INTO atracciones SET? ", atracciones)
        res.json({message:"atraccion añadida correctamente"})
        //una validacion de nombre repetido
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
//esto sirve para exportar las funciones y usarlas en otros lados
export const methods={
 getatraccions,
 addatraccion,
 getatraccion,
 deleteatraccion,
 updateatraccion
}












/*
//estas son validaciones 
        if(name === undefined || direccion===undefined){
            res.status(400).json({message:"llene todos los campos por favor."})
            return
        }
        //
}*/