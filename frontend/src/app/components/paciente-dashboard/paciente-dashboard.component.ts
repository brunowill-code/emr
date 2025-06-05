import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { FilterComponent } from "../../components-angular-material/filter/filter.component";
import { TableComponent } from "../../components-angular-material/table/table.component";
import { IFilterOptions } from '../../interfaces/filter/filter-options.interface';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { AgendamentoService } from '../../services/agendamento.service';
import { ListOverviewComponentComponent } from "../../components-angular-material/list-overview-component/list-overview-component.component";
import { filterAgendamentosList } from '../../utils/filter-agendamento';
import { filterAgendamentosStatusList } from '../../utils/filter-agendamento-status';
import { IFilterOptionsPaciente } from '../../interfaces/filter/filter-options-paciente.interface';

@Component({
  selector: 'app-paciente-dashboard',
  imports: [TollbarheaderComponent, MatDivider, FilterComponent, TableComponent, ListOverviewComponentComponent],
  templateUrl: './paciente-dashboard.component.html',
  styleUrl: './paciente-dashboard.component.css'
})
export class PacienteDashboardComponent {

  private readonly _agendamentoService = inject(AgendamentoService);

  selectedAgendamentoFinalizado: IAgendamento | null = null;

  pdfs = {
    atestadoBase64: '',
    prescricaoBase64: '',
    exameEncaminhamentoBase64: ''
  };

onFilter(filterOption: IFilterOptionsPaciente) {
  console.log('filtro no pai', filterOption);
  this.agendamentoListFiltered = filterAgendamentosStatusList(filterOption, this.agendamentoList);
}
  agendamentoList: IAgendamento[] = [];
  
    agendamentoListFiltered : IAgendamento[] = []
  
    agendamentoSelected : IAgendamento = {} as IAgendamento;
  
  constructor(){
    this.getAgendmentos()
  }
  getAgendmentos() {
    this._agendamentoService.getAgendamentosByPacient().subscribe({
      next: (resp) => {
        console.log('Agendamentos recebidos:', resp);
        this.agendamentoList = resp;
        this.agendamentoListFiltered = this.agendamentoList;
      },
      error: (err) => {
        console.error('Erro ao buscar agendamentos:', err);
      }
    })
  }

showAgendamentoDetails : boolean = false;
onAgendamentoSelected(agendamento: IAgendamento) {
  // Buscar os PDFs
  if (agendamento.status === 'finalizado') {

  this._agendamentoService.getArquivosDaConsulta(agendamento.id_agendamento).subscribe({
    next: (pdfs) => {
      this.pdfs = pdfs;
      console.log('PDFs recebidos:', pdfs);
    },
    error: (err) => {
      console.error('Erro ao buscar PDFs:', err);
    }
  });
}
  this.agendamentoSelected = agendamento;
  this.showAgendamentoDetails = true;

}
}
