import { isWithinInterval } from "date-fns";
import { IAgendamento } from "../interfaces/agendamento.interface";
import { IFilterOptions } from "../interfaces/filter/filter-options.interface";

const filterAgendamentoListByName =(name_profissional: string | undefined, agendamentoList: IAgendamento[]): IAgendamento[] => {
    const NAME_NOT_TYPED = name_profissional === undefined;

    if(NAME_NOT_TYPED){
      return agendamentoList;
    }

    const filteredList = agendamentoList.filter(
      (agendamento)=>agendamento.nome_profissional.toLowerCase().includes(name_profissional.toLocaleLowerCase()));

    return filteredList;
}

const filterAgendamentoListByEspecialidade = (especialidade: string | undefined, agendamentoList: IAgendamento[]): IAgendamento[] => {
    const ESPECIALIDADE_NOT_TYPET = especialidade === undefined; 

    if(ESPECIALIDADE_NOT_TYPET){
      return agendamentoList;
    }

    const filteredList = agendamentoList.filter(
      (agendamento)=>agendamento.especialidade.toLowerCase().includes(especialidade.toLocaleLowerCase())
    );
    return filteredList;
}

const filterAgendamentoListByDate = (startDate: Date | undefined, endDate: Date | undefined, agendamentoList: IAgendamento[]): IAgendamento[]  =>{
    const DATE_NOT_SELECTED = (startDate === undefined) || (endDate === undefined);
    console.log(DATE_NOT_SELECTED);

    if(DATE_NOT_SELECTED){
      return agendamentoList;
    };

    const filteredList = agendamentoList.filter(
      (agendamento)=>isWithinInterval(new Date (agendamento.data_agendamento), {
        start: startDate,
        end: endDate,
      }))

      return filteredList;
}

const filterAgendamentosList = (filterOption: IFilterOptions, agendamentoList: IAgendamento[]): IAgendamento[] => {
    let filteredList: IAgendamento[] = [];

    filteredList = filterAgendamentoListByName( filterOption.name_profissional, agendamentoList );
  
    filteredList = filterAgendamentoListByEspecialidade(filterOption.especialidade,filteredList);

    filteredList = filterAgendamentoListByDate(filterOption.startDate, filterOption.endDate, filteredList);

    return filteredList;
}

export { filterAgendamentosList };