import { Router } from "express";
import { crearNota, borrarNota, actualizarNota, verNota, verNotas } from "../controller/notas.js";

const router = Router();

router
    .post("/nota", crearNota)
    .get("/nota/:id", verNota)
    .get("/notas", verNotas)
    .delete("/nota/:id", borrarNota)
    .put("/nota/:id", actualizarNota);


export default router;