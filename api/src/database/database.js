import mysql from "promise-mysql"
import config from "./../config"
//con esto hare mi conexion a la base de datos
const connection = mysql.createConnection({
    host:config.host,
    database:config.database,
    user:config.user,
    password:config.password
})
const getconnection=() =>{
    return connection;
};
module.exports={
    getconnection
}