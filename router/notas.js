import { Router } from "express";
import { crearNota } from "../controller/notas.js";

const router = Router();

router.post("/crear", crearNota);


export default router;