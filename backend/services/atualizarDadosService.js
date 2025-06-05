import db from '../config/database.js';


export async function getIdProfissionalDeSaude(id) {
    const query = `
    SELECT id_profissional_de_saude
    FROM profissional_de_saude
    WHERE id_usuario = $1;`;
    try {
        const res = await db.query(query,[id]);
        return res.rows;
    } catch (error) {
        console.error('erro ao achar id', error);
    }
}

export async function addProfissionalService(user_id, crm, especialidade) {
    const query = `
    INSERT INTO profissional_de_saude (id_usuario, crm, id_especialidade)
    SELECT $1, $2, id_especialidade FROM especialidade WHERE tipo_especialidade = $3
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[user_id,crm,especialidade]);
        return res.rows;
    } catch (error) {
        console.error('erro ao achar id', error);
    }

}

export async function completeProfileService(userId) {
    const query = `
    UPDATE usuario
    SET profile_completed = true
    WHERE id_usuario = $1
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[userId]);
        return res.rows;
    } catch (error) {
        console.error('erro ao achar id', error);
    }


}