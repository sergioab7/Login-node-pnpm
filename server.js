import express from "express";
import morgan from "morgan";
import authRouter from "./router/auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.disable("x-powered-by");

const PUERTO = process.env.PORT || 3131;

app.use("/api/auth", authRouter);

app.listen(PUERTO, () => {
    console.log("[+] Servidor escuchando en el puerto: " + PUERTO);
})
 