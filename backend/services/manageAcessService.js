import db from '../config/database.js'

export async function getUsersWithoutAcessService() {
    const query = `
    SELECT id_usuario,nome_usuario, email, id_perfil_acesso
    FROM usuario
    WHERE id_perfil_acesso = 5
    `;
    try {
        const res = await db.query(query);
        console.log('resultado:', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Erro ao buscar usuários', error);
    }
}

export async function giveAcessService(id_usuario,id_acesso) {
    const query = `
    UPDATE usuario
    SET id_perfil_acesso = $1
    WHERE id_usuario = $2;
    `;
    try {
        const res = await db.query(query,[id_acesso,id_usuario]);
        return res.rows;
    } catch (error) {
        console.error('erro ao dar acesso', error);
    }
}

export async function addPacientesService(id_usuario) {
    const query = `
    INSERT INTO paciente (id_usuario)
    VALUES ($1)
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[id_usuario]);
        console.log('paciente adicionado', res.rows);
        return res.rows
    } catch (error) {
        console.error('erro ao adicionar paciente', error);
    }

}