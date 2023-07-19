import { Router, request, response } from "express";
const router = Router()
//import {methods as users} from "./../controllers/users"
import {methods as atracciones} from "./../controllers/atracciones"

//basicamente le estoy pasando la carpeta users y que usen la funcion getusers que es un json y este se mostrara
//

/////
router.get("/",atracciones.getatraccions );
router.get("/:id",atracciones.getatraccion );
router.post("/",atracciones.addatraccion );
router.delete("/:id",atracciones.deleteatraccion );
router.put("/:id",atracciones.updateatraccion );

export default router;