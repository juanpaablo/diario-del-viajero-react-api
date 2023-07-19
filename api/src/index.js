import app from "./app";
const main= () =>{
app.listen(app.get("port"))
console.log(`servidor corriendo en ${app.get("port")}`)
};
main();