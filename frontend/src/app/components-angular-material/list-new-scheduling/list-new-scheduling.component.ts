import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CustomDatePipe } from '../../pipes/date.type';
import { HorarioPipe } from '../../pipes/horario.pipe';
import { IAgenda } from '../../interfaces/agenda.interface';
import { IFilterNewScheduling } from '../../interfaces/filter/filter-new-scheduling.interface';

@Component({
  selector: 'app-list-new-scheduling',
  imports: [MatListModule , CustomDatePipe, MatDivider,MatButton],
  templateUrl: './list-new-scheduling.component.html',
  styleUrl: './list-new-scheduling.component.css'
})
export class ListNewSchedulingComponent {
  
  
@Output('onMarcar') marcarConsultaEmmitter = new EventEmitter<IAgenda>;

onMarcarConsulta(agenda:IAgenda) {
  console.log('vou passar essa agenda pro pai : ',agenda);
  this.marcarConsultaEmmitter.emit(agenda);
}

    @Input({required: true}) agenda : IAgenda = {} as IAgenda;
    @Input() showAgendaDetails: boolean = false;
    @Input({required: true}) filterOptions : IFilterNewScheduling = {} as IFilterNewScheduling;

}
