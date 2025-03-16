import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { AgendamentoService } from '../../services/agendamento.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { filterAgendamentosList } from '../../utils/filter-agendamento';
import { IFilterOptions } from '../../interfaces/filter/filter-options.interface';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { TableComponent } from "../../components-angular-material/table/table.component";
import { FilterComponent } from "../../components-angular-material/filter/filter.component"; 
import { ListOverviewComponentComponent } from "../../components-angular-material/list-overview-component/list-overview-component.component";
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";

@Component({
  selector: 'app-agendamento',
  providers: [provideNativeDateAdapter()],

  imports: [ListOverviewComponentComponent, TableComponent, FilterComponent, CommonModule, MatDividerModule, RouterModule, TollbarheaderComponent],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.css'
})
export class AgendamentoComponent  {

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _agendamentoService = inject(AgendamentoService);
  private readonly _activatedRoute = inject(ActivatedRoute);


  agendamentoList: IAgendamento[] = [];
  agendamentoListFiltered : IAgendamento[] = []
  agendamentoSelected : IAgendamento = {} as IAgendamento;

  constructor() {
    this.getAgendamentos(); 
  }
  
  getAgendamentos() {
    this._agendamentoService.getAgendamentos().subscribe({
      next: (resp) => {
        console.log('Dados Recebidos:', resp);
        this.agendamentoList = resp; 
        this.agendamentoListFiltered = this.agendamentoList; // Clona o array
        //console.log('agendamentoListFiltered',this.agendamentoListFiltered);
      },
      error: (err) => {
        console.error('Erro ao buscar agendamentos:', err);
      }
    });
  }

  showAgendamentoDetails : boolean = false;
  onAgendamentoSelected(agendamento: IAgendamento) {
    this.agendamentoSelected = agendamento;
    this.showAgendamentoDetails = true;
  }

  onFilter(filterOption:IFilterOptions) {
    console.log(filterOption);

    this.agendamentoListFiltered = filterAgendamentosList(filterOption, this.agendamentoList)
  }

  onDesmarcarConsulta(agendamento:IAgendamento) {
    const user_type = this._authService.getUserScopes();
    this._agendamentoService.desmarcarAgendamentos(agendamento)
    .subscribe({
      next: () => {
        console.log('backend chamado');
      },
      error: (err) => {
        console.error('Erro ao desmarcar consulta:', err);
      }
    });
  }  
  
onConfirmarPresenca(agendamento: IAgendamento) {
  const user_type = this._authService.getUserScopes();
  this._agendamentoService.confirmarPresenca(agendamento).subscribe({
    next: () =>{
      console.log('backend chamado');
    },
    error: (err) => {
      console.error('Erro ao desmarcar consulta:', err);
    }
  })
}

  
  

  

}




