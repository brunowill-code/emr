import { getAtendimentoById,
    iniciarAtendimentoByAtendimento,
    verificarProntuario,
    iniciarConsultaService,
    novoProntuario ,
    newSoapService, 
    statusAgendamentoFinalizadoService, 
    getHistoricoService,
    salvarAtestadoService,
    vincularAtestadoConsultaService,
    salvarExameService,
    vincularExameConsultaService,
    salvarPrescricaoService,
    vincularPrescricaoConsultaService,
    getAtestadoService,
    getExameService,
    getPrescricaoService
} from "../services/atendimentoService.js"

import {  encrypt, decrypt  } from "../services/cryptoService.js"
export const getAtendimento = async (req, res) =>{
    const type_acess = req.user.scopes;
    const id_usuario = req.user.id;
    console.log('id :', id_usuario);
    if(type_acess === 'medico'){
        const atendimentos = await getAtendimentoById(id_usuario);
        console.log('atendimentos :', atendimentos);

        return res.json({atendimentos});
    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}

export const iniciarAtendimento = async (req, res) => {
    const type_acess = req.user.scopes;
    const id_usuario = req.user.id;
    const atendimento = req.body;

    console.log(atendimento);
    console.log('id paciente', atendimento.id_paciente);
    console.log('id_profissional_de_saude', atendimento.id_profissional_de_saude);

    console.log('atendimentos iniciado com sucesso :');

    if (type_acess === 'medico') {
        try {
            // Verifica se já existe um prontuário para o paciente (independente do profissional)
            const prontuario = await verificarProntuario(atendimento.id_paciente);
            console.log('prontuario na rota', prontuario)
            let idProntuario;

            if (!prontuario || prontuario.length === 0) {
                console.log('prontuário não existe, criando novo...');
                const novo = await novoProntuario(atendimento.id_paciente, atendimento.id_profissional_de_saude);
                idProntuario = novo.id_prontuario;
            } else {
                console.log('prontuário já existe');
                idProntuario = prontuario[0].id_prontuario;
                console.log('id prontuario',idProntuario);
            }

            const consulta = await iniciarConsultaService(atendimento, idProntuario);
            console.log('consulta', consulta[0].id_consulta);
            return res.status(200).json({
                sucesso: true,
                id_consulta: consulta[0].id_consulta,
                id_prontuario:consulta[0].id_prontuario,
                })

        } catch (error) {
            console.error('Erro ao iniciar atendimento:', error);
            return res.status(500).json({ message: 'Erro ao iniciar atendimento' });
        }

    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}
export const finalizarConsulta= async(req, res)=>{
    const type_acess = req.user.scopes;
    if(type_acess === 'medico'){
        console.log('usuario autorizado, finalizar consulta');
        const { id_consulta, subjetivo, objetivo, avaliacao, plano } = req.body;
        if (!id_consulta) {
            return res.status(400).json({ error: 'id_consulta é obrigatório' });
        }
        //// criptografaaaaaar
        //// criptografaaaaaar
        //// criptografaaaaaar
        //// criptografaaaaaar
        //// criptografaaaaaar
        //// criptografaaaaaar
        //// criptografaaaaaar
        //// criptografaaaaaar
        const subjetivo_criptografado = await encrypt(subjetivo);
        const objetivo_criptografado = await encrypt(objetivo);
        const avaliacao_criptografado = await encrypt(avaliacao);
        const plano_criptografado = await encrypt(plano);

        const newSoap = await newSoapService(id_consulta, subjetivo_criptografado, objetivo_criptografado, avaliacao_criptografado, plano_criptografado);
        console.log(newSoap);
        const statusAgendamentoFinalizado = statusAgendamentoFinalizadoService(newSoap.id_agendamento)
        return res.status(200).json({message : 'Consulta Finalizada'})
    }
    else {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}

export const getHistorico = async (req, res) => {
    const type_acess = req.user.scopes;
  
    if (type_acess === 'medico') {
      //console.log('usuario autorizado');
      const idProntuario = req.query.idProntuario;
      //console.log('id prontuario ', idProntuario);
  
      const historico = await getHistoricoService(idProntuario);
      //console.log('get historico,', historico);

      const historicoComConteudo = historico.filter(registro =>
        registro.subjetivo || registro.objetivo || registro.avaliacao || registro.plano
      );
  
      const historicoDescriptografado = await Promise.all(
        historicoComConteudo.map(async (registro) => ({
          ...registro,
          subjetivo: registro.subjetivo ? JSON.parse(await decrypt(registro.subjetivo)) : null,
          objetivo: registro.objetivo ? JSON.parse(await decrypt(registro.objetivo)) : null,
          avaliacao: registro.avaliacao ? JSON.parse(await decrypt(registro.avaliacao)) : null,
          plano: registro.plano ? JSON.parse(await decrypt(registro.plano)) : null
        }))
      );
    
      res.json(historicoDescriptografado);
  
    } else {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
  }

export const salvarAtestados = async(req,res) =>{
    const type_acess = req.user.scopes;
    console.log(type_acess)
    if (type_acess === 'medico') {
        console.log('usuario autorizado a salvar');
        const atestato = req.body;
        //console.log(atestato);
        const pdfCriptografado = await encrypt(atestato.pdf)
        //console.log('pdf criptografado', pdfCriptografado)
        const salvarAtestado = await salvarAtestadoService(pdfCriptografado)
        const vincularAtestadoConsulta = await vincularAtestadoConsultaService(salvarAtestado.id_atestado, atestato.id_consulta)
        console.log(vincularAtestadoConsulta);
    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });

    }
}

export const salvarExames = async ( req, res ) =>{
    const type_acess = req.user.scopes;
    if(type_acess === 'medico') {
        console.log('usuario autorizado a salvar');
        const exames = req.body;
        const exameCriptografado = await encrypt(exames.pdf);
        const salvarExame = await salvarExameService(exameCriptografado);
        console.log('id_exame', salvarExame.id_exame)
        const vincularExameConsulta = await vincularExameConsultaService(salvarExame.id_exame, exames.id_consulta)
        res.json();

    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });

    }
}

export const salvarPrescricao = async (req, res) => {
    const type_acess = req.user.scopes;
    if(type_acess === 'medico') {
        console.log('usuario autorizado a salvar');
        const prescricao = req.body;
        console.log('prescricao',prescricao.pdf);

        const prescricaoCriptografado = await encrypt(prescricao.pdf);
        const salvarPres = await salvarPrescricaoService(prescricaoCriptografado);
        console.log('salvarPres',salvarPres.id_prescricao);
        const vincularPrescricaoConsulta = await vincularPrescricaoConsultaService(salvarPres.id_prescricao, prescricao.id_consulta)
        res.json();
    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });

    }
}

export const getArquivos = async (req, res) => {
    try {
      const type_acess = req.user.scopes;
      if (type_acess !== 'paciente') {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }
  
      console.log('Usuário autorizado a salvar');
      const agendamentoId = req.query.agendamentoId;
      if (!agendamentoId) {
        return res.status(400).json({ message: 'agendamentoId é obrigatório' });
      }
  
      const arquivos = {};
  
      // Atestado
      const getAtestado = await getAtestadoService(agendamentoId);
      if (getAtestado && getAtestado.atestado) {
        const atestadoBase64 = await decrypt(getAtestado.atestado);
        arquivos.atestadoBase64 = atestadoBase64;
      }
  
      // Exame
      const getExame = await getExameService(agendamentoId);
      if (getExame && getExame.exame) {
        const exameEncaminhamentoBase64 = await decrypt(getExame.exame);
        arquivos.exameEncaminhamentoBase64 = exameEncaminhamentoBase64;
      }
  
      // Prescrição
      const getPrescricao = await getPrescricaoService(agendamentoId);
      if (getPrescricao && getPrescricao.prescricao) {
        const prescricaoBase64 = await decrypt(getPrescricao.prescricao);
        arquivos.prescricaoBase64 = prescricaoBase64;
      }
  
      // Se nenhum arquivo estiver disponível
      if (Object.keys(arquivos).length === 0) {
        return res.status(200).json({ arquivos });
      }
  
      return res.status(200).json(arquivos);
  
    } catch (error) {
      console.error('Erro ao obter arquivos:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar arquivos' });
    }
  };
