import express, { json } from "express";
import morgan from "morgan";
//rutas
import LenguageRoutes from "./routes/lenguage.routes"
import atraccionRoutes from "./routes/atracciones.routes"
import comentariosRoutes from "./routes/comments.routes"
const app=express()
//settings hacemos que este en el port 4000
app.set("port",4000)
//midlewares este da detalles de los listados y peticiones en la consola
app.use(morgan("dev"))
app.use(express.json())
//rutas
app.use("/users",LenguageRoutes);
app.use("/atracciones",atraccionRoutes);
app.use("/comentarios",comentariosRoutes)
export default app;