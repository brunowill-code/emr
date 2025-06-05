import db from '../config/database.js'

export async function registrarUsuario(user,senha) {
    const query = `
    INSERT INTO usuario (nome_usuario, email, id_perfil_acesso, senha, cpf)
    VALUES ($1,$2,$3,$4,$5);
    `;
    const id_acesso = 5;
    try {
        const res = await db.query(query,[user.name, user.email, id_acesso, senha, user.cpf]);
        console.log('usuario cadastrado , ', res.rows);
        return res.rows;

    } catch (error) {
        console.log('Erro ao cadastrar usuário', error);
    }
}