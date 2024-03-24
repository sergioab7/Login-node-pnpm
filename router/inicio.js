import { Router } from "express";
import { dashboard } from "../controller/inicio.js";


const router = Router();

router.get("/dashboard", dashboard);

export default router;