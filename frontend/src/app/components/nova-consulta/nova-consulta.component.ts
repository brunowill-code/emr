import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IAgenda } from '../../interfaces/agenda.interface';
import { AgendamentoService } from '../../services/agendamento.service';
import { IFilterNewScheduling } from '../../interfaces/filter/filter-new-scheduling.interface';
import { FilterNewSchedulingComponent } from "../../components-angular-material/filter-new-scheduling/filter-new-scheduling.component";
import { provideNativeDateAdapter } from '@angular/material/core';
import { TableNewSchedulingComponent } from "../../components-angular-material/table-new-scheduling/table-new-scheduling.component";
import { ListNewSchedulingComponent } from "../../components-angular-material/list-new-scheduling/list-new-scheduling.component";
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";


@Component({
  selector: 'app-nova-consulta',
    providers: [provideNativeDateAdapter()],
  
  imports: [MatDivider, FilterNewSchedulingComponent, TableNewSchedulingComponent, ListNewSchedulingComponent, TollbarheaderComponent],
  templateUrl: './nova-consulta.component.html',
  styleUrl: './nova-consulta.component.css'
})
export class NovaConsultaComponent {
onMarcarConsulta(agenda: IAgenda) {
  console.log('Agenda no pai:',agenda );
  const type_acess =  this._authService.getUserScopes();
  console.log('back chamado')
  this._agendamentoService.marcarConsulta(agenda)
  .subscribe({
    next: () => {
      console.log('backend chamado');
    },
    error: (err) => {
      console.error('Erro ao marcar consulta:', err);
      if (err.status === 401) {
        // O token está ausente ou expirado, trate o erro adequadamente.
        alert('Sua sessão expirou, por favor, faça login novamente.');
      }
    }
  })
  ;
}


  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _agendamentoService = inject(AgendamentoService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  agendaList: IAgenda[] = [];

  agendaListFiltered : IAgenda[] = []

  agendaSelected : IAgenda = {} as IAgenda;
  
  filterNewSchedulingOption : IFilterNewScheduling = {} as IFilterNewScheduling;


getAgenda(filterNewSchedulingOption: IFilterNewScheduling) {
  console.log(filterNewSchedulingOption);

  this._agendamentoService.getAgenda(filterNewSchedulingOption).subscribe({
    next: (resp) => {
      console.log('Dados Recebidos:', resp);
      this.agendaList = resp; 
    },
    error: (err) => {
      console.error('Erro ao buscar agenda:', err);
    }
  });
}

onFilterOptionNewSchedule(filterNewSchedulingOption:IFilterNewScheduling) {

  console.log(filterNewSchedulingOption);
  this.filterNewSchedulingOption = filterNewSchedulingOption;
  console.log('Chamando agenda...');

  this.getAgenda(filterNewSchedulingOption);

  
}

showAgendaDetails : boolean = false;
onAgendaSelected(agenda: IAgenda) {
  this.agendaSelected = agenda;
  this.showAgendaDetails = true;
}

onFilter() {
throw new Error('Method not implemented.');
}
onSolicitacoesSelected() {
throw new Error('Method not implemented.');
}
onAgendarConsultaSelected() {
throw new Error('Method not implemented.');
}
onSairSelected() {
throw new Error('Method not implemented.');
}

}
