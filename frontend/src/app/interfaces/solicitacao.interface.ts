export interface ISolicitacao {
    id_solicitacao: number;
    id_paciente: number;
    id_especialidade: number;
    id_profissional_de_saude: number;
    data_solicitacao: string; // Confirme se é este o nome correto!
    status: string;
    tipo_especialidade:string;
    nome_usuario:string;
    resposta:string;
  }
  