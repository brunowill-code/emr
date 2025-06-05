import { 
    getSolicitacaoById,
    solicitarAtendimentoPaciente,
    getAgendamentos,
    desmarcarConsultaService,
    confirmarPresencaService,
    buscarHorariosLivres,
    marcarNovaConsulta,
    filterAgendamentoByPaciente,
    getAllSolicitacao,
    aceitarSolicitacaoService,
    rejeitarSolicitacaoService,
    } from '../services/agendaService.js';
import { getPacienteByCPF } from '../services/pacienteService.js';
import { getProfissionalIdByCRM } from '../services/profissionalService.js';

export const agenda = async (req,res) =>{
    const type_acess = req.user.scopes;
    //console.log('req user: ',req.user.scopes);
    //console.log('tipo de acesso =', type_acess);
    if(type_acess === 'tecnico' || type_acess === 'admin' || type_acess === 'medico') {
        console.log('usuario autorizado');
        const agendamentos = await getAgendamentos();
        console.log(agendamentos);
        res.json({agendamentos});
    }
    else{
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}

export const desmarcarConsulta = async(req,res) =>{
    const type_acess = req.user.scopes;
    const  agendamento = req.body;

    if(type_acess === 'tecnico' || type_acess === 'admin' || type_acess === 'medico') {        
        const agendamentos = await desmarcarConsultaService(agendamento);
        res.json();
    }
    else{
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}

export const confirmarPresenca = async(req,res) => {
    const type_acess = req.user.scopes;
    const agendamento = req.body;
    if(type_acess === 'tecnico' || type_acess === 'admin' || type_acess === 'medico') {        
        const agendamentos = await confirmarPresencaService(agendamento);
        res.json();
    }
    else{
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}

export const agendaLivre = async (req, res) => {
    const type_acess = req.user.scopes;
    const {filterOptions} = req.body;

    const profissionalResponse = await getProfissionalIdByCRM(filterOptions.crm_profissional);

    const cpfPacienteResponse = await getPacienteByCPF(filterOptions.cpf_paciente);
    
    // Aguarde a resolução da Promise e obtenha o ID do profissional
    if (type_acess === 'tecnico' || type_acess === 'admin' || type_acess === 'medico') {
        console.log("usuario aturorizado né");

        if (!profissionalResponse || profissionalResponse.length === 0) {
            console.log('Erro: Profissional não encontrado');
            return res.status(404).json({ message: 'Profissional não encontrado' });
        }
    
        if (!cpfPacienteResponse || cpfPacienteResponse.length === 0) {
            console.log('Erro: paciente não encontrado');
            return res.status(404).json({ message: 'paciente não encontrado' });
        }
    
        const profissional_id = profissionalResponse[0].id_profissional_de_saude;
        const paciente_id = cpfPacienteResponse[0].id_paciente
        try {
            // Passando o profissional_id corretamente para a função de buscar horários
            const agenda = await buscarHorariosLivres(profissional_id, filterOptions.date_scheduling, paciente_id);
            //console.log('agenda depois de filtrada', agenda);
            res.json({agenda});
        } catch (error) {
            console.error('Erro ao buscar os atendimentos:', error);
            return res.status(500).json({ message: 'Erro ao buscar atendimentos' });
        }
    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }  
};

export const marcarConsulta = async (req,res) => {
    console.log('Corpo da requisição:', req.body); // Verifique o conteúdo do corpo da requisição
    const type_acess = req.user.scopes;
    const  agenda  = req.body;
    console.log('agenda: ', agenda)
    if(type_acess === 'tecnico' || type_acess === 'medico' || type_acess === 'admin'){
        console.log('usuario autorizado a marcar consulta');
        const marcar = await marcarNovaConsulta(agenda);
        return res.json();
    }
    else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }
}

export const agendamentoByPacientes = async (req, res) =>{
    console.log('corpo da requisição', req.body);
    const type_acess = req.user.scopes;
    const id_paciente = req.user.id;
    if(type_acess === 'paciente'){
        console.log('usuario é paciente');
        const agendamentos = await filterAgendamentoByPaciente(id_paciente);
        console.log('agendamentos', agendamentos);
        return res.json({agendamentos});
    } 
    else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }
}

export const solicitarAtendimento = async (req, res) =>{
    const type_acess = req.user.scopes;
    const id_paciente = req.user.id;
    const agendamento = req.body;
    console.log('id', id_paciente);
    console.log(agendamento);
    if(type_acess === 'paciente'){
        console.log('usuario é paciente, vou solicitar');
        const solicitacao = await solicitarAtendimentoPaciente(id_paciente,agendamento);
        return res.json();
    } else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }

}

export const getSolicitacao = async (req, res) =>{
    const type_acess = req.user.scopes;
    const id = req.user.id;
    console.log(req.user.id);
    if(type_acess === 'paciente'){
        console.log('usuario é paciente');
        const solicitacao = await getSolicitacaoById(id);
        return res.json(solicitacao);
    } else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }

}

export const getAllSolicitacoes = async(req,res) =>{
    const type_acess = req.user.scopes;
    const id = req.user.id;
    console.log(req.user.id);
    if(type_acess === 'tecnico' || type_acess === 'medico' || type_acess === 'admin'){
        const solicitacao = await getAllSolicitacao();
        return res.json(solicitacao);
    } else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }
}

export const rejeitarSolicitacao = async(req,res) =>{
    const type_acess = req.user.scopes;
    if(type_acess === 'tecnico' || type_acess === 'medico' || type_acess === 'admin'){
        const solicitacao = req.body;
        await rejeitarSolicitacaoService(solicitacao);
        return res.json();
    } else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }
}

export const aceitarSolicitacao = async (req, res) =>{
    const type_acess = req.user.scopes;
    if(type_acess === 'tecnico' || type_acess === 'medico' || type_acess === 'admin'){
        const solicitacao = req.body;
        await aceitarSolicitacaoService(solicitacao);
        return res.json();
    } else {
        return res.status(401).json({ message : 'Usuário não Autorizado'});
    }
}

