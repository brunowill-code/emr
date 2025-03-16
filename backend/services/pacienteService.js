import db from "../config/database.js";

export async function getPacienteByCPF(cpf) {
    const query = `
        SELECT p.id_paciente 
        FROM paciente p
        JOIN usuario u ON p.id_usuario = u.id_usuario
        WHERE u.cpf = $1;

    `;
    try {
        const result = await db.query(query,[cpf]);
        console.log("id paciente ", result.rows);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }

}