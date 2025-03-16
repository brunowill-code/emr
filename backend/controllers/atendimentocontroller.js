import { getAtendimentoById, iniciarAtendimentoByAtendimento,verificarProntuario,iniciarConsultaService,novoProntuario } from "../services/atendimentoService.js"

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

export const iniciarAtendimento = async(req,res) => {
    const type_acess = req.user.scopes;
    const id_usuario = req.user.id;
    const atendimento = req.body;
    console.log(atendimento);
    console.log('id paciente',atendimento.id_paciente);
    console.log('id_profissional_de_saude',atendimento.id_profissional_de_saude);

    console.log('atendimentos iniciado com sucesso :');

    if(type_acess === 'medico'){
        //const atendimentos = await iniciarAtendimentoByAtendimento(atendimento.id_agendamento);
        //console.log('atendimentos iniciado com sucesso :', atendimentos);
        const prontuario = await verificarProntuario(atendimento.id_paciente,atendimento.id_profissional_de_saude);
        if(prontuario.length === 0){
            console.log('prontuario não existe');
            const newProntuario = await novoProntuario(atendimento.id_paciente,atendimento.id_profissional_de_saude);
            const consulta = await iniciarConsultaService(atendimento,newProntuario.id_prontuario);
            return res.json();

        } else {
            console.log('prontuario existe');
            const consulta = await iniciarConsultaService(atendimento,prontuario.id_prontuario);
            return res.json();

        }
        //console.log('prontuario iniciado', prontuario);
        //console.log(prontuario);
        //const consulta = await iniciarConsultaService(atendimento,prontuario.id_prontuario);
        //console.log('consulta iniciada com sucesso :', consulta);

    } else {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
}