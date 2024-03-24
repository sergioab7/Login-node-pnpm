import conexion from "../database/conexion.js"

export const dashboard = async(req,res) => {
    const query = `
        SELECT *
        FROM notas
        WHERE user_id = ?
    `;
    const values = [req.user];
    const [encontrarNotas] = await conexion.query(query,values);
    if(!encontrarNotas){
        res.status(200).json({
            status:"Error",
            message:"[-] Notas no encontradas."
        })
    }

    res.status(200).json({
        status:"Success",
        notas:encontrarNotas
    })
}