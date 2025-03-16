export interface IAgendamento {
    id_agendamento: number;
    hora_agendamento: string;
    data_agendamento: string;
    status: string;
    nome_profissional: string;
    especialidade: string;
    nome_paciente: string;
    id_paciente: number;
    id_profissional:number;
}
