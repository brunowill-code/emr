import db from "../config/database.js";


export async function getAgendamentos() {
    const query = `
    SELECT
    a.id_agendamento,
    a.hora_agendamento,
    a.data_agendamento,
    a.status,
    u_profissional.nome_usuario AS nome_profissional,
    e.tipo_especialidade AS especialidade,
    u_paciente.nome_usuario AS nome_paciente
    FROM agendamento a
    JOIN profissional_de_saude ps ON a.id_profissional_de_saude = ps.id_profissional_de_saude
    JOIN usuario u_profissional ON ps.id_usuario = u_profissional.id_usuario
    JOIN especialidade e ON ps.id_especialidade = e.id_especialidade
    JOIN paciente p ON a.id_paciente = p.id_paciente
    JOIN usuario u_paciente ON p.id_usuario = u_paciente.id_usuario
    WHERE a.status = 'agendado'
    ORDER BY a.data_agendamento, a.hora_agendamento;
    `;
    
    try {
        const result = await db.query(query);
        
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

export async function desmarcarConsultaService(agendamento) {
    const query = `
    UPDATE agendamento
    SET status = 'desmarcado'
    WHERE id_agendamento = $1
    RETURNING *;    
    `;

    try {
        const result = await db.query(query,[agendamento.id_agendamento]);
        console.log("Consulta desmarcada:", result.rows[0]);
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

export async function confirmarPresencaService(agendamento){
    const query = `
    UPDATE agendamento
    SET status = 'paciente_presente'
    WHERE id_agendamento = $1
    RETURNING *;    
    `
    try {
        const result = await db.query(query,[agendamento.id_agendamento]);
        console.log("Pacienete Presente:", result.rows[0]);

        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}
export async function buscarHorariosLivres(id_profissional, date,id_paciente) {
    const query = `
WITH paciente_dados AS (
    SELECT 
        p.id_paciente,
        u.nome_usuario AS nome_paciente
    FROM 
        paciente p
    JOIN 
        usuario u ON p.id_usuario = u.id_usuario
    WHERE 
        p.id_paciente = $3
),
agendamentos AS (
    SELECT
        a.id_profissional_de_saude,
        a.data_agendamento,
        a.hora_agendamento,
        a.status,
        p.id_paciente
    FROM
        agendamento a
    JOIN 
        paciente p ON a.id_paciente = p.id_paciente
    WHERE
        a.status IN ('agendado', 'paciente_presente')
),
intervalos_livres AS (
    SELECT
        generate_series(
            $2::timestamp + INTERVAL '08:00',  
            $2::timestamp + INTERVAL '18:00',  
            '30 minutes'::interval
        ) AS horario
)
SELECT
    i.horario::date AS data,
    i.horario::time AS hora,
    u.nome_usuario AS nome_profissional,
    pd.nome_paciente AS nome_paciente,
    pd.id_paciente,  -- Adicionando o id_paciente
    p.id_profissional_de_saude  -- Adicionando o id_profissional_de_saude
FROM
    intervalos_livres i
JOIN
    profissional_de_saude p ON p.id_profissional_de_saude = $1
JOIN
    usuario u ON p.id_usuario = u.id_usuario
JOIN
    paciente_dados pd ON TRUE  -- Traz os dados do paciente (nome e id) em todas as linhas
LEFT JOIN
    agendamentos a ON i.horario::date = a.data_agendamento
    AND i.horario::time = a.hora_agendamento::time
    AND a.id_profissional_de_saude = $1
WHERE
    a.hora_agendamento IS NULL  -- Filtra apenas horários livres para o profissional
    AND NOT EXISTS (
        SELECT 1
        FROM agendamento a2
        JOIN paciente p2 ON a2.id_paciente = p2.id_paciente
        WHERE p2.id_paciente = $3
        AND a2.data_agendamento = i.horario::date
        AND a2.hora_agendamento::time = i.horario::time
        AND a2.status IN ('agendado', 'paciente_presente')
    )
ORDER BY
    i.horario;

`;
    const dateWithoutTZ = new Date(date).toISOString().split("T")[0];
    const startTime = `${dateWithoutTZ} 08:00:00-03`; // Definindo GMT-3 para horário brasileiro
    try {
        const res = await db.query(query,[id_profissional,dateWithoutTZ,id_paciente]);
        //console.log('Horários livres:', res.rows);
        return res.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }
}

export async function marcarNovaConsulta(agenda) {
    const query = `
    INSERT INTO agendamento (id_profissional_de_saude,id_paciente,data_agendamento,hora_agendamento,status)
    VALUES ($1,$2,$3,$4,$5);
    `;
    const status = 'agendado';
    try{
        const res = await db.query(query, [
            agenda.id_profissional_de_saude,
            agenda.id_paciente,
            agenda.data,
            agenda.hora,
            status
            ]);
            console.log
        return res.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
    }

}

export async function filterAgendamentoByPaciente(id,agendamento) {
    const query = `
    SELECT
        a.id_agendamento,
        a.hora_agendamento,
        a.data_agendamento,
        a.status,
        u_profissional.nome_usuario AS nome_profissional,
        e.tipo_especialidade AS especialidade,
        u_paciente.nome_usuario AS nome_paciente
    FROM agendamento a
    JOIN profissional_de_saude ps ON a.id_profissional_de_saude = ps.id_profissional_de_saude
    JOIN usuario u_profissional ON ps.id_usuario = u_profissional.id_usuario
    JOIN especialidade e ON ps.id_especialidade = e.id_especialidade
    JOIN paciente p ON a.id_paciente = p.id_paciente
    JOIN usuario u_paciente ON p.id_usuario = u_paciente.id_usuario
    WHERE u_paciente.id_usuario = $1
    AND a.status IN ('agendado' , 'finalizado')
    ORDER BY a.data_agendamento, a.hora_agendamento;
    `;
    try{
        const res = await db.query(query,[id]);
        return res.rows;
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);

    }
}

export async function solicitarAtendimentoPaciente(id,agendamento) {
    const query = `
    INSERT INTO public.solicitacoes (id_paciente, id_especialidade, data_solicitacao)
    SELECT p.id_paciente, e.id_especialidade, $3 
    FROM public.paciente p, public.especialidade e
    WHERE p.id_usuario = $1 AND e.tipo_especialidade = $2
    RETURNING *;
    `;
    try{
        const res = await db.query(query,[id,agendamento.especialidade, agendamento.startDate]);
        return res.rows;
        console.log(res.rows);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);

    }
}

export async function getSolicitacaoById(id) {
    if (!id) {
        throw new Error("O ID do usuário não foi fornecido");
      }
    
      const query = `
        SELECT 
        s.*, 
        e.tipo_especialidade
    FROM solicitacoes s
    JOIN paciente p ON s.id_paciente = p.id_paciente
    JOIN usuario u ON p.id_usuario = u.id_usuario
    JOIN especialidade e ON s.id_especialidade = e.id_especialidade
    WHERE u.id_usuario = $1;
      `;
    
      console.log("Executando query:", query, "com userId:", id);
    
      try {
        const result = await db.query(query, [id]);
        console.log(result.rows);
        return result.rows;
      } catch (error) {
        console.error("Erro ao executar consulta:", error);
        throw error;
      }

}

export async function getAllSolicitacao() {
    const query = `
    SELECT 
    s.*,
    e.tipo_especialidade,
    u.nome_usuario
    FROM solicitacoes s
    JOIN especialidade e ON s.id_especialidade = e.id_especialidade
    JOIN paciente p ON  s.id_paciente = p.id_paciente
    JOIN usuario u ON p.id_usuario = u.id_usuario;
    `;
    try {
        const result = await db.query(query);
        console.log(result.rows);
        return result.rows;
      } catch (error) {
        console.error("Erro ao executar consulta:", error);
        throw error;
      }
}

export async function rejeitarSolicitacaoService(solicitacao) {
    const query = `
    UPDATE solicitacoes
    SET resposta = $1, status = $3
    WHERE id_solicitacao = $2
    `;
    const status = 'rejeitado';
    try {
        const result = await db.query(query,[solicitacao.resposta, solicitacao.id_solicitacao,status])
    } catch (error) {
        console.error("Erro ao executar consulta:", error);
    }
}

export async function aceitarSolicitacaoService(solicitacao) {
    const query = `
    UPDATE solicitacoes
    SET resposta = $1, status = $3
    WHERE id_solicitacao = $2
    `;
    const status = 'aceito';
    try {
        const result = await db.query(query,[solicitacao.resposta, solicitacao.id_solicitacao,status])
    } catch (error) {
        console.error("Erro ao executar consulta:", error);
    }
}