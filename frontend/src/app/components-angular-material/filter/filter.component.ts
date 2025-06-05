import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { IFilterOptions } from '../../interfaces/filter/filter-options.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { IFilterOptionsPaciente } from '../../interfaces/filter/filter-options-paciente.interface';

interface Especialidade {
  value: string | undefined;
  viewValue: string;
}

interface status {
  value: string | undefined;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  providers: [provideNativeDateAdapter()],
  imports: [ MatSelectModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, FormsModule, MatDatepickerModule,MatButtonModule, MatIconModule ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  private readonly _authService = inject(AuthService);
  type_acess = this._authService.getUserScopes();



  filterOption:IFilterOptions = {
    name_profissional: undefined,
    especialidade: undefined,
    startDate: undefined,
    endDate: undefined, 
  }

  filterOptionPaciente:IFilterOptionsPaciente = {
    name_profissional: undefined,
    especialidade: undefined,
    startDate: undefined,
    endDate: undefined,
    status: undefined,
  }

  @Output('onFilter') filterOptionEmitter = new EventEmitter<IFilterOptions>();
  @Output('onFilterPaciente') filterOptionPacienteEmitter = new EventEmitter<IFilterOptionsPaciente>();

  onFilter(){
    if(this.type_acess === 'paciente'){
      this.filterOptionPacienteEmitter.emit(this.filterOptionPaciente)
      console.log(this.filterOptionPaciente);
    }
    this.filterOptionEmitter.emit(this.filterOption);
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
  {value: 'agendado', viewValue: 'Agendado'},
]

}
