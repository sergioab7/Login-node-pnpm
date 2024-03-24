import express from "express";
import morgan from "morgan";
import authRouter from "./router/auth.js";
import inicioRouter from "./router/inicio.js";
import notasRouter from "./router/notas.js";
import { verificarToken } from "./middlewares/validateToken.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.disable("x-powered-by");

const PUERTO = process.env.PORT || 3131;

app.use("/api/auth", authRouter);
app.use("/api/", verificarToken, inicioRouter);
app.use("/api/notas", verificarToken, notasRouter);

app.listen(PUERTO, () => {
    console.log("[+] Servidor escuchando en el puerto: " + PUERTO);
})
 