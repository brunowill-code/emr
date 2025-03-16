import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IFilterOptionsPaciente } from '../../interfaces/filter/filter-options-paciente.interface';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IFilterOptions } from '../../interfaces/filter/filter-options.interface';

interface Especialidade {
  value: string | undefined;
  viewValue: string;
}

interface status {
  value: string | undefined;
  viewValue: string;
}

@Component({
  selector: 'app-nova-solicitacao',
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, FormsModule, MatDatepickerModule,MatButtonModule, MatIconModule ],
  templateUrl: './nova-solicitacao.component.html',
  styleUrl: './nova-solicitacao.component.css'
})


export class NovaSolicitacaoComponent {

@Output('onNovaSolicitacao') filterOptionEmitter = new EventEmitter<IFilterOptions>();
  
onSolicitar() {
  this.filterOptionEmitter.emit(this.filterOptionPaciente);
}


  filterOptionPaciente:IFilterOptionsPaciente = {
      name_profissional: undefined,
      especialidade: undefined,
      startDate: undefined,
      endDate: undefined,
      status: undefined,
    }
  
    especialidadeList: Especialidade[] = [
      {value: undefined, viewValue: ''},
      {value: 'Cardiologista', viewValue: 'Cardiologista'},
      {value: 'Ortopedista', viewValue: 'Ortopedista'},
      {value: 'Pediatria', viewValue: 'Pediatria'},
    ];

    statusList: status[] = [
      {value: undefined, viewValue: ''},
      {value: 'finalizado', viewValue: 'Finalizado'},
      {value: 'analise', viewValue: 'Em análise '},
      {value: 'marcado', viewValue: 'Marcado'},
    ]
    
}
