import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { AtendimentoService } from '../../services/atendimento.service';
import { TableComponent } from "../../components-angular-material/table/table.component";
import { ListOverviewComponentComponent } from "../../components-angular-material/list-overview-component/list-overview-component.component";
import { Router } from '@angular/router';
import { SoapService } from '../../services/soap.service';

@Component({
  selector: 'app-medico-dashboard',
  imports: [TollbarheaderComponent, MatDivider, TableComponent, ListOverviewComponentComponent],
  templateUrl: './medico-dashboard.component.html',
  styleUrl: './medico-dashboard.component.css'
})
export class MedicoDashboardComponent {


  private readonly _router = inject(Router);
  private readonly _atendimentoService = inject(AtendimentoService);
  private readonly _soapService = inject(SoapService);

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
    this._atendimentoService.iniciarAtendimento(atendimento).subscribe({
      next: (res) => {
        console.log('Resposta do backend:', res);
        const idConsulta = res.id_consulta;
        const idProntuario = res.id_prontuario;
        this._soapService.setIdConsulta(idConsulta);
        console.log('ID da consulta:', idConsulta);

        this._soapService.setIdProntuario(idProntuario);
        console.log('ID do Prontuario:', idProntuario);

        //this._soapService.setIdConsulta(res.)
        this._router.navigate(['/prontuario']);
      },
      error: (err) => {
        console.error('Erro ao desmarcar consulta:', err);
      }
    });
  }
}
