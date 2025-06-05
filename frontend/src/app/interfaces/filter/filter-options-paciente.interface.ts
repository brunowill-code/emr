export interface IFilterOptionsPaciente{
    name_profissional: string | undefined;
    especialidade: string | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    status: 'agendado' | 'analise' | 'finalizado'| undefined;
}