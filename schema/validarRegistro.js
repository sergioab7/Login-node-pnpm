import { z } from "zod";

const schemaRegistro = z.object({
    username:z.string({
        required_error:"[-] Error: Se requiere el username",
        invalid_type_error:"[-] Error: Debe de ser tipo string"
    }).min(5, {
        message:"[-] Error: Se requiere mínimo 5 caracteres."
    }).max(25, {
        message:"[-] Error: No puede pasar de 25 caracteres."
    }),
    email:z.string({
        required_error:"[-] Error: Se requiere el email.",
        invalid_type_error:"[-] Error: Debe de ser tipo string."
    }).email({
        message:"[-] Error: El e-mail es inválido."
    }),
    password:z.string()
})


export const validacionRegistro = (objeto) => {
    return schemaRegistro.parse(objeto);
}