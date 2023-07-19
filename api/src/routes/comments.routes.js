import { Router, request, response } from "express";
const router = Router()
//import {methods as users} from "./../controllers/users"
import {methods as comentarios} from "./../controllers/comentarios"

router.post("/",comentarios.addcomentario);
router.get("/",comentarios.getcomentarios );

export default router;