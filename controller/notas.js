import conexion from "../database/conexion.js";

export const crearNota = async(req,res) => {
    const { titulo, descripcion } = req.body;

    if(!titulo && !titulo.trim() !== ""){
        return res.status(400).json({
            status:"Error",
            message:"[-] No existe el título"
        })
    }

    if(!descripcion){
        return res.status(400).json({
            status:"Error",
            message:"[-] No existe la descripción."
        })
    }

    const query = `
        INSERT INTO notas (titulo, descripcion, user_id)
        VALUES (?,?,?)
    `;
    const values = [titulo,descripcion, req.user];
    const [addNota] = await conexion.query(query,values);

    if(!addNota){
        return res.status(400).json({
            status:"Error",
            message:"[-] No existe la nota."
        })
    }

    return res.status(200).json({
        status:"Success",
        message:"[+] Nota guardada con éxito"
    })
}