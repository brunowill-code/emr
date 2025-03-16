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

@Component({
  selector: 'app-paciente-dashboard',
  imports: [TollbarheaderComponent, MatDivider, FilterComponent, TableComponent, ListOverviewComponentComponent],
  templateUrl: './paciente-dashboard.component.html',
  styleUrl: './paciente-dashboard.component.css'
})
export class PacienteDashboardComponent {

  private readonly _agendamentoService = inject(AgendamentoService);


onFilter(filterOption: IFilterOptions) {
  this.agendamentoListFiltered = filterAgendamentosList(filterOption, this.agendamentoList);
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
  this.agendamentoSelected = agendamento;
  this.showAgendamentoDetails = true;

}
}
