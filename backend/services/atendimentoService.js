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

export async function verificarProntuario(id_paciente) {
    const query = `
    SELECT *
    FROM prontuario
    WHERE id_paciente = $1
    `
    try {
        const res = await db.query(query,[id_paciente]);
        console.log('resultado',res.rows);
        return res.rows;
    } catch (error) {
        console.error("Erro ao iniciar Prontuario", error);
    }
}
export async function novoProntuario(id_paciente) {
    const query = `
    INSERT INTO prontuario (id_paciente)
    VALUES ($1)
    RETURNING *;

    `;
    try {
        const res = await db.query(query,[id_paciente]);
        console.log(res.rows);
        return res.rows;
    } catch (error) {
        console.error("Erro ao criar novo prontuario", error);
    }
}



export async function iniciarConsultaService(consulta,id_prontuario) {
    const query = `
    INSERT INTO consulta (id_agendamento, data_consulta, hora_consulta,id_profissional,id_prontuario)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[
            consulta.id_agendamento,
            consulta.data_agendamento,
            consulta.hora_agendamento,
            consulta.id_profissional_de_saude,
            id_prontuario
        ]);
        return res.rows;
    } catch (error) {
        console.error("Erro ao iniciar Prontuario, erro iniciarConsultaService", error);
    }
}



export async function newSoapService(id_consulta, subjetivo, objetivo, avaliacao, plano) {
    const query = `
    UPDATE consulta
    SET subjetivo = $2, objetivo = $3, avaliacao = $4, plano = $5
    WHERE id_consulta = $1
    RETURNING *;

    `;
    try {
        const result = await db.query(query,[id_consulta,subjetivo,objetivo,avaliacao,plano])
        return result.rows[0];

    } catch (error) {
        console.error('Erro ao finalizar consulta:', error);

    }
}

export async function statusAgendamentoFinalizadoService(id_agendamento) {
    const query = `
    UPDATE agendamento
    SET status = $2
    WHERE id_agendamento = $1
    RETURNING *;

    `;

    const status = 'finalizado'
    try {
        const res = await db.query(query,[id_agendamento, status]);
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao finalizar consulta: mudando status', error);

    }
}

export async function getHistoricoService(idProntuario) {
    const query = `
    SELECT 
    c.id_consulta,
    c.id_prontuario,
    c.data_consulta,
    COALESCE(c.subjetivo, '') AS subjetivo,
    COALESCE(c.objetivo, '') AS objetivo,
    COALESCE(c.avaliacao, '') AS avaliacao,
    COALESCE(c.plano, '') AS plano,
    u.nome_usuario AS nome_profissional
FROM 
    consulta c
JOIN 
    profissional_de_saude p ON p.id_profissional_de_saude = c.id_profissional
JOIN 
    usuario u ON u.id_usuario = p.id_usuario
WHERE 
    c.id_prontuario = $1
ORDER BY 
    c.data_consulta DESC;
    `;
    try {
        const res = await db.query(query,[idProntuario]);
        console.log('prontuario', res.rows);
        return res.rows;
    } catch (error) {
        console.error('Erro ao finalizar consulta: mudando status', error);

    }
}

export async function salvarAtestadoService(pdf) {
    const query = `
    INSERT INTO atestado (atestado)
    VALUES ($1)
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[pdf]);
        console.log('adicionado ao banco ',res.rows);
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao salvar atestado', error);
    }
}

export async function vincularAtestadoConsultaService(id_atestado,id_consulta) {
    const query = `
    UPDATE consulta
    SET id_atestado = $1
    WHERE id_consulta = $2;
    `
    try {
        const res = await db.query(query,[id_atestado,id_consulta]);
        console.log('adicionado ao banco ',res.rows);
        return res.rows;
    } catch (error) {
        console.error('Erro ao vincular consulta atestado', error);
    }
}

export async function salvarExameService(pdf) {
    const query = `
    INSERT INTO exame_emcaminhamento (exame)
    VALUES ($1)
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[pdf]);
       // console.log('adicionado ao banco ',res.rows);
        console.log('rows',res.rows[0])
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao salvar exame', error);
    }
}

export async function vincularExameConsultaService(id_exame,id_consulta) {
    const query = `
    UPDATE consulta
    SET id_exame = $1
    WHERE id_consulta = $2;
    `
    try {
        const res = await db.query(query,[id_exame,id_consulta]);
        console.log('adicionado ao banco ',res.rows);
        return res.rows;
    } catch (error) {
        console.error('Erro ao vincular consulta exame', error);
    }
}

export async function salvarPrescricaoService(pdf) {
    const query = `
    INSERT INTO prescricao (prescricao)
    VALUES ($1)
    RETURNING *;
    `;
    try {
        const res = await db.query(query,[pdf]);
        //console.log('adicionado ao banco ',res.rows);
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao salvar exame', error);
    }
}

export async function vincularPrescricaoConsultaService(id_prescricao,id_consulta) {
    const query = `
    UPDATE consulta
    SET id_prescricao = $1
    WHERE id_consulta = $2;
    `
    try {
        const res = await db.query(query,[id_prescricao,id_consulta]);
        console.log('adicionado ao banco ',res.rows);
        return res.rows;
    } catch (error) {
        console.error('Erro ao vincular consulta exame', error);
    }
}
export async function getAtestadoService(agendamentoId) {
    const query = `
    SELECT 
    a.id_agendamento,
    at.atestado
    FROM 
    agendamento a
    JOIN 
    consulta c ON c.id_agendamento = a.id_agendamento
    JOIN 
    atestado at ON at.id_atestado = c.id_atestado
    WHERE 
    a.id_agendamento = $1;
    `
    try {
        const res = await db.query(query,[agendamentoId]);
        //console.log('atestado ',res.rows);
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao vincular consulta exame', error);
    }
}

export async function getExameService(agendamentoId) {
    const query = `
    SELECT 
    a.id_agendamento,
    e.exame
    FROM 
    agendamento a
    JOIN 
    consulta c ON c.id_agendamento = a.id_agendamento
    JOIN 
    exame_emcaminhamento e ON e.id_exame = c.id_exame
    WHERE 
    a.id_agendamento = $1;
    `
    try {
        const res = await db.query(query,[agendamentoId]);
        //console.log('atestado ',res.rows);
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao vincular consulta exame', error);
    }
}

export async function getPrescricaoService(agendamentoId) {
    const query = `
    SELECT 
    a.id_agendamento,
    p.prescricao
    FROM 
    agendamento a
    JOIN 
    consulta c ON c.id_agendamento = a.id_agendamento
    JOIN 
    prescricao p ON p.id_prescricao = c.id_prescricao
    WHERE 
    a.id_agendamento = $1;
    `
    try {
        const res = await db.query(query,[agendamentoId]);
        //console.log('atestado ',res.rows);
        return res.rows[0];
    } catch (error) {
        console.error('Erro ao vincular consulta exame', error);
    }
}