import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IFilterOptions } from '../../interfaces/filter/filter-options.interface';
import { IFilterNewScheduling } from '../../interfaces/filter/filter-new-scheduling.interface';
import { FormsModule } from '@angular/forms';

interface Especialidade {
  value: string | undefined;
  viewValue: string;
}

@Component({
  selector: 'app-filter-new-scheduling',
  imports: [ MatFormFieldModule, MatSelectModule, MatInputModule, MatIcon, MatDatepickerModule, MatButton,FormsModule],
  templateUrl: './filter-new-scheduling.component.html',
  styleUrl: './filter-new-scheduling.component.css'
})
export class FilterNewSchedulingComponent {

@Output('onFilterOptionNewSchedule') FilterOptionsNewScheduleEmiiter = new EventEmitter<IFilterNewScheduling>;

onFilter() {
  this.FilterOptionsNewScheduleEmiiter.emit(this.filterOptionNewScheduling);
}

filterOptionNewScheduling:IFilterNewScheduling = {
  cpf_paciente: undefined,
  crm_profissional: undefined,
  date_scheduling:  undefined, 
  }

especialidadeList: Especialidade[] = [
  {value: undefined, viewValue: ''},
  {value: 'Cardiologia', viewValue: 'Cardiologia'},
  {value: 'Desmatologia', viewValue: 'Desmatologia'},
  {value: 'Pediatria', viewValue: 'Pediatria'},
];

}
