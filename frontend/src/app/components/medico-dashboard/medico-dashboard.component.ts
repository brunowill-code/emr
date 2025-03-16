import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { AtendimentoService } from '../../services/atendimento.service';
import { TableComponent } from "../../components-angular-material/table/table.component";
import { ListOverviewComponentComponent } from "../../components-angular-material/list-overview-component/list-overview-component.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-dashboard',
  imports: [TollbarheaderComponent, MatDivider, TableComponent, ListOverviewComponentComponent],
  templateUrl: './medico-dashboard.component.html',
  styleUrl: './medico-dashboard.component.css'
})
export class MedicoDashboardComponent {

  private readonly _router = inject(Router);
  private readonly _atendimentoService = inject(AtendimentoService);

    atendimentoList: IAgendamento[] = [];
    atendimentoSelected : IAgendamento = {} as IAgendamento;

    constructor() {
      this.getAtendimentos(); 
    }
    
    getAtendimentos() {
      this._atendimentoService.getAtendimentos().subscribe({
        next: (resp) => {
          console.log('Dados Recebidos:', resp);
          this.atendimentoList = resp; 
          //console.log('agendamentoListFiltered',this.agendamentoListFiltered);
        },
        error: (err) => {
          console.error('Erro ao buscar agendamentos:', err);
        }
      });
    }
  
  showAtendimentoDetails : boolean = false;
  onAtendimentoSelected(agendamento: IAgendamento) {
    this.atendimentoSelected = agendamento;
    console.log(this.atendimentoSelected)
    this.showAtendimentoDetails = true;
  }
  onIniciarConsulta(atendimento: IAgendamento) {
    console.log('opa')
    this._atendimentoService.iniciarAtendimento(atendimento).subscribe({
      next: () => {
        console.log('backend chamado');
      },
      error: (err) => {
        console.error('Erro ao desmarcar consulta:', err);
      }
    });
    
    this._router.navigate(['/prontuario']);
  }
}
