import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { TableComponent } from "../../components-angular-material/table/table.component";
import { TableSolicitacaoComponent } from "./table-solicitacao/table-solicitacao.component";
import { ISolicitacao } from '../../interfaces/solicitacao.interface';
import { AgendamentoService } from '../../services/agendamento.service';
import { ListOverviewComponentComponent } from "../../components-angular-material/list-overview-component/list-overview-component.component";
import { DetailsSolicitacaoComponent } from "./details-solicitacao/details-solicitacao.component";

@Component({
  selector: 'app-manage-solicitacoes',
  imports: [TollbarheaderComponent, MatDivider, TableSolicitacaoComponent, DetailsSolicitacaoComponent],
  templateUrl: './manage-solicitacoes.component.html',
  styleUrl: './manage-solicitacoes.component.css'
})
export class ManageSolicitacoesComponent {


solicitacaoList: ISolicitacao[] = [];

solicitacaoSelected : ISolicitacao = {} as ISolicitacao;


private readonly _agendamentoService = inject(AgendamentoService);

constructor(){
  this.getSolicitacoes();
}
  getSolicitacoes() {
    this._agendamentoService.getAllSolicitacoes().subscribe({
      next:(resp) => {
        console.log('Dados Recebidos:', resp);
        this.solicitacaoList = resp; 
      },
      error: (err) => {
        console.error('Erro ao buscar agendamentos:', err);
      }
    })
  }
  showSolicitacaoDetails= false;
  onSolicitacaoSelected(solicitacao: ISolicitacao) {
    console.log('solicitacao no pai', solicitacao);
    this.solicitacaoSelected = solicitacao;
    this.showSolicitacaoDetails = true;
  }
  onRejeitarSolicitacao(solicitacao: ISolicitacao) {
    this._agendamentoService.rejeitarSolicitacao(solicitacao).subscribe({
      next:() => {
        console.log('Backend chamado');
        this.getSolicitacoes();
      },
      error: (err) =>{
        console.error('Erro ao buscar agendamentos:', err);

      }
    })
  }
  onConfirmarSolicitacao(solicitacao: ISolicitacao) {
    this._agendamentoService.aceitarSolicitacao(solicitacao).subscribe({
      next:() => {
        console.log('Backend chamado');
        this.getSolicitacoes();
      },
      error: (err) =>{
        console.error('Erro ao buscar agendamentos:', err);

      }
    })
  }
}


