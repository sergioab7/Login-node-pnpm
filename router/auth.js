import { Router } from "express";
import { login, registro } from "../controller/auth.js";
 
const router = Router();

router.post("/login", login);

router.post("/registro", registro);

export default router;