import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { IFilterOptionsPaciente } from '../../interfaces/filter/filter-options-paciente.interface';
import { NovaSolicitacaoComponent } from "../../components-angular-material/nova-solicitacao/nova-solicitacao.component";
import { IFilterOptions } from '../../interfaces/filter/filter-options.interface';
import { AgendamentoService } from '../../services/agendamento.service';
import { IAgenda } from '../../interfaces/agenda.interface';
import { ISolicitacao } from '../../interfaces/solicitacao.interface';
import { TableSolicitacaoComponent } from "../manage-solicitacoes/table-solicitacao/table-solicitacao.component";


@Component({
  selector: 'app-solicitacoes',
  imports: [TollbarheaderComponent, MatDivider, NovaSolicitacaoComponent, TableSolicitacaoComponent],
  templateUrl: './solicitacoes.component.html',
  styleUrl: './solicitacoes.component.css'
})
export class SolicitacoesComponent {

  solicitacaoList: ISolicitacao[] = [];
  
  constructor() {
    this.getSolicitacoes(); 
  }
  getSolicitacoes() {
    this._agendamentoService.getSolicitacoes().subscribe({
      next: (resp) => {
        console.log('Dados Recebidos:', resp);
        this.solicitacaoList = resp; 
        //console.log('agendamentoListFiltered',this.agendamentoListFiltered);
      },
      error: (err) => {
        console.error('Erro ao buscar agendamentos:', err);
      }
    })
  }

  private readonly _agendamentoService = inject(AgendamentoService);

onNovaSolicitacao(filterOptionPaciente: IFilterOptions) {
  console.log('on solicitacao : ',filterOptionPaciente);
  this._agendamentoService.onSolicitar(filterOptionPaciente).subscribe({
    next: () =>{
      console.log('backend chamado');
    },
    error: (err) => {
      console.error('Erro ao desmarcar consulta:', err);
    }
  })

}
onFilterPaciente($event: IFilterOptionsPaciente) {
  throw new Error('Method not implemented.');
}
}
