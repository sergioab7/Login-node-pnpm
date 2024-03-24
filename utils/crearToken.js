import jwt from "jsonwebtoken";

export const crearToken = async(id) => {
    const promesa = new Promise((resolve,reject) => {
        jwt.sign({id:id}, process.env.JWT_PASSWORD, {expiresIn:'1d'}, (err,token) => {
            if(err) reject(err);
            resolve(token);
        })
    })
    return promesa;
}