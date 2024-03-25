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

export const borrarNota = async(req,res) => {
    const { id } = req.params;
    
    const query = `
        DELETE FROM notas
        WHERE id = ? AND user_id = ?;
    `;
    
    const valor = [parseInt(id), req.user];
    const borrarNotaQuery = await conexion.query(query, valor);
    if(!borrarNotaQuery){
        return res.status(400).json({
            status:"Error",
            message:"[-] No se ha podido borrar la nota."
        })
    }

    return res.status(200).json({
        status:"Success",
        message:"[+] Nota borrada correctamente."
    })

}

export const actualizarNota = async(req,res) => {
    const { id } = req.params;
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
        UPDATE notas
        SET titulo = ?, descripcion = ?
        WHERE id = ? AND user_id = ?;
    `;

    const valores = [titulo, descripcion, parseInt(id), req.user];
    const [actualizarNotaQuery] = await conexion.query(query,valores);
    if(!actualizarNotaQuery){
        return res.status(400).json({
            status:"Error",
            message:"[-] No se puede actualizar las notas."
        })
    }

    return res.status(200).json({
        status:"Success",
        message:"[+] Nota actualizadas con éxito"
    })    
}

export const verNotas = async(req,res) => {
    const query = `
        SELECT *
        FROM notas
        WHERE user_id = ?
    `;
    const valores = [req.user];
    const verNotasQuery = await conexion.query(query, valores);
    if(!verNotasQuery){
        return res.status(400).json({
            status:"Error",
            message:"[-] No se pueden ver las notas."
        })
    }

    return res.status(200).json({
        status:"Success",
        notas: verNotasQuery[0]
    })      
}

export const verNota = async(req,res) => {
    const { id } = req.params;

    const query = `
        SELECT *
        FROM notas
        WHERE id = ? AND user_id = ?
    `;
    const valores = [parseInt(id), req.user];
    const verNotaQuery = await conexion.query(query, valores);
    if(!verNotaQuery){
        return res.status(400).json({
            status:"Error",
            message:"[-] No se puede ver la nota."
        })
    }

    return res.status(200).json({
        status:"Success",
        notas: verNotaQuery[0]
    })
}