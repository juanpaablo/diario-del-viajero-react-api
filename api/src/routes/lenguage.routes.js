import { Router, request, response } from "express";
const router = Router()
import {methods as users} from "./../controllers/users"
import {methods as atracciones} from "./../controllers/atracciones"

//basicamente le estoy pasando la carpeta users y que usen la funcion getusers que es un json y este se mostrara
//
router.get("/",users.getusers );
router.get("/:id",users.getuser );
router.post("/",users.addusers );
router.delete("/:id",users.deleteuser );
router.put("/:id",users.updateeuser );
/////
router.get("/atracciones",atracciones.getatraccions );
router.get("/atracciones/:id",atracciones.getatraccion );
router.post("/atracciones",atracciones.addatraccion );
router.delete("/atracciones/:id",atracciones.deleteatraccion );
router.put("/atracciones/:id",atracciones.updateatraccion );

export default router;