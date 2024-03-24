import jwt from "jsonwebtoken";

export const verificarToken = async(req,res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return res.status(500).json({
            status:"Error",
            message:"[-] No existe el token"
        })
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err,decode) => {
        if(err){
            return res.status(400).json({
                status:"Error",
                message:"[-] El token ha expirado o es inválido."
            })
        }
        req.user = decode.id;
    })

    next();
}