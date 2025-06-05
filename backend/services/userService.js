import db from "../config/database.js";

export async function getUsersWithAcess(username) {
  const query = `
        SELECT email, senha, type_acess, id_usuario, profile_completed
        FROM public.usuario
        JOIN public.perfil_acesso 
        ON usuario.id_perfil_acesso = perfil_acesso.id_perfil_acess
        WHERE usuario.email = $1;
    `;
  try {
    const res = await db.query(query, [username]);
    return res.rows[0]; // Retorna apenas um usuário
  } catch (err) {
    console.error("Erro na busca do usuário", err);
    throw err;
  }
}