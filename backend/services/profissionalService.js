import db from "../config/database.js";

export async function getProfissionalIdByCRM(crm) {
    const query = `
        SELECT id_profissional_de_saude
        FROM public.profissional_de_saude
        WHERE crm = $1
    `;
    try {
        const result = await db.query(query,[crm]);
        console.log("id profissional no service", result.rows);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }

}