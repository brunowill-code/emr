import db from "../config/database.js";

export async function getAtendimentoById(id_usuario) {
    const query = `
    SELECT
    a.id_agendamento,
    a.hora_agendamento,
    a.data_agendamento,
    a.status,
    a.id_paciente,
    a.id_profissional_de_saude,
    u_profissional.nome_usuario AS nome_profissional,
    e.tipo_especialidade AS especialidade,
    u_paciente.nome_usuario AS nome_paciente
    FROM agendamento a
    JOIN profissional_de_saude ps ON a.id_profissional_de_saude = ps.id_profissional_de_saude
    JOIN usuario u_profissional ON ps.id_usuario = u_profissional.id_usuario
    JOIN especialidade e ON ps.id_especialidade = e.id_especialidade
    JOIN paciente p ON a.id_paciente = p.id_paciente
    JOIN usuario u_paciente ON p.id_usuario = u_paciente.id_usuario
    WHERE a.status = 'paciente_presente'
    AND u_profissional.id_usuario = $1
    ORDER BY a.data_agendamento, a.hora_agendamento;
    `;
    try {
        const res = await db.query(query,[id_usuario]);
        return  res.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

export async function iniciarAtendimentoByAtendimento(id) {
    const query = `
    UPDATE agendamento
    SET status = $1
    WHERE id_agendamento = $2
    `;
    const status = 'consulta_iniciada';
    try {
        const res = await db.query(query,[status,id]);
        return res.rows;
    } catch (error) {
        console.error("Erro ao iniciar atendimento", error);
    }
}

export async function verificarProntuario(id_paciente,id_profissional) {
    const query = `
    SELECT *
    FROM prontuario
    WHERE id_paciente = $1 and id_profissional = $2
    `
    try {
        const res = await db.query(query,[id_paciente,id_profissional]);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error("Erro ao iniciar Prontuario", error);
    }
}
export async function novoProntuario(id_paciente,id_profissional) {
    const query = `
    INSERT INTO prontuario (id_paciente, id_profissional)
    VALUES ($1, $2)
    RETURNING *;

    `;
    try {
        const res = await db.query(query,[id_paciente,id_profissional]);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error("Erro ao criar novo prontuario", error);
    }
}



export async function iniciarConsultaService(consulta,id_prontuario) {
    const query = `
    INSERT INTO consulta (id_agendamento, data_consulta, hora_consulta,id_paciente,id_profissional,id_prontuario)
    VALUES($1,$2,$3,$4,$5,$6);
    `;
    try {
        const res = await db.query(query,[
            consulta.id_agendamento,
            consulta.data_agendamento,
            consulta.hora_agendamento,
            consulta.id_paciente,
            consulta.id_profissional_de_saude,
            id_prontuario
        ]);
        return res.rows;
    } catch (error) {
        console.error("Erro ao iniciar Prontuario", error);
    }
}

