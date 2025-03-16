import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CustomDatePipe } from '../../../pipes/date.type';
import { ISolicitacao } from '../../../interfaces/solicitacao.interface';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-details-solicitacao',
  imports: [MatListModule , CustomDatePipe, MatDivider, MatButton,
    MatSelectModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, FormsModule, MatDatepickerModule,MatButtonModule, MatIconModule
  ],
  templateUrl: './details-solicitacao.component.html',
  styleUrl: './details-solicitacao.component.css'
})
export class DetailsSolicitacaoComponent {

  @Output('onRejeitarSolicitacao') rejeitarSolicitacaoEmitter = new EventEmitter<ISolicitacao>
  @Output('onConfirmarSolicitacao') confirmarSolicitacaoEmmitter = new EventEmitter<ISolicitacao>;
  
  
    @Input({required: true}) solicitacao : ISolicitacao = {} as ISolicitacao;
    @Input() showAgendamentoDetails: boolean = false;

  onRejeitarSolicitacao(solicitacao: ISolicitacao) {
    this.rejeitarSolicitacaoEmitter.emit(solicitacao);
  }  
  onConfirmarSolicitacao(solicitacao: ISolicitacao) {
    this.confirmarSolicitacaoEmmitter.emit(solicitacao);
  }  
}
