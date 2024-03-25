import conexion from "../database/conexion.js"
import { validacionRegistro } from "../schema/validarRegistro.js";
import bcrypt from "bcrypt";
import { crearToken } from "../utils/crearToken.js";

export const registro = async (req,res) => {
    try{
        const validacion = validacionRegistro(req.body);
        if(!validacion){
            return res.status(400).json({
                status:"Error",
                message:"Error en la validación"
            })
        }

        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(12);
        const passwordEncrypted = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO usuarios (username, email, password)
            VALUES (?, ?, ?)
        `;
        const valores = [username, email, passwordEncrypted];
        const [registroUsuario] = await conexion.query(query,valores);

        if(!registroUsuario){
            return res.status(200).json({
                status:"Error",
                message:"[-] Ha habido un error al registrar al usuario",
            })
        }

        return res.status(200).json({
            status:"Success",
            message:"[+] Usuario registrado con éxito",
        })
        
    }catch(err){
        console.log(err);
        return res.status(400).json({
            status:"Error",
            message:err
        })
    }
}
export const login = async (req,res) => {
    try{
        const {email} = req.body;
        const query = `
            SELECT id, username, email, id_nota, created
            FROM usuarios
            WHERE email = ?
        `;
        const valor = [email];
        const [existeUsuario] = await conexion.query(query,valor);
        if(!existeUsuario[0].email){
            return res.status(400).json({
                status:"Error",
                message:"[-] No existe el usuario."
            })
        }
        console.log();
        const queryPassword = `
            SELECT password
            FROM usuarios
            WHERE email = ?
        `;
        const valorPassword = [req.body.email];
        const [conseguirPassword] = await conexion.query(queryPassword,valorPassword);
        console.log(conseguirPassword[0].password);
        if(!conseguirPassword){
            return res.status(400).json({
                status:"Error",
                message:"[-] Usuario o password incorrectos."
            })
        }

        const passwordCorrecta = await bcrypt.compare(req.body.password, conseguirPassword[0].password);

        if(!passwordCorrecta){
            return res.status(400).json({
                status:"Error",
                message:"[-] Usuario o password incorrectos."
            })
        }

        const token = await crearToken(existeUsuario[0].id);
        return res.status(200).json({
            status:"Success",
            message:"[+] Has logueado sesión correctamente.",
            usuario:existeUsuario[0],
            token:token
        })
    }catch(e){
        console.log(e);
        return res.status(400).json({
            status:"Error",
            message:"[-] Usuario o contraseña incorrectos."
        })
    }

}