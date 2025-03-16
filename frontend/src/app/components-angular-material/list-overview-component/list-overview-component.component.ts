import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { CustomDatePipe } from "../../pipes/date.type";
import { HorarioPipe } from "../../pipes/horario.pipe"; // ✅ Importando o CommonModule
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-list-overview-component',
  imports: [MatListModule , CustomDatePipe, HorarioPipe, MatDivider,MatButton],
  templateUrl: './list-overview-component.component.html',
  styleUrl: './list-overview-component.component.css'
})


export class ListOverviewComponentComponent {


  @Input({required: true}) agendamento : IAgendamento = {} as IAgendamento;
  @Input() showAgendamentoDetails: boolean = false;


private readonly _authService = inject(AuthService);
user_type = this._authService.getUserScopes();

@Output('onDesmarcar') desmarcarConsultaEmmitter = new EventEmitter<IAgendamento>;
@Output('onConfirmarPresenca') confirmarPresencaEmmitter = new EventEmitter<IAgendamento>;
@Output('onIniciarConsulta') iniciarConsultaEmmitter = new EventEmitter<IAgendamento>;



onConfirmarPresenca(agendamento:IAgendamento) {
  this.confirmarPresencaEmmitter.emit(agendamento);
}
onDesmarcarConsulta(agendamento:IAgendamento) {
  this.desmarcarConsultaEmmitter.emit(agendamento)
}
onIniciarConsulta(atendimento: IAgendamento) {
  this.iniciarConsultaEmmitter.emit(atendimento);
}
}
