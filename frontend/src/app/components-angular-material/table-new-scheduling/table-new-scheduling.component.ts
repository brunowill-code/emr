import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HorarioPipe } from '../../pipes/horario.pipe';
import { IAgenda } from '../../interfaces/agenda.interface';
import { CustomDatePipe } from "../../pipes/date.type";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-new-scheduling',
  imports: [MatTableModule, MatPaginatorModule, HorarioPipe, CustomDatePipe, CommonModule],
  templateUrl: './table-new-scheduling.component.html',
  styleUrls: ['./table-new-scheduling.component.css']
})
export class TableNewSchedulingComponent implements OnChanges {
  @Input() agendaList: IAgenda[] = [];

  displayedColumns: string[] = ['data', 'hora', 'nome_profissional'];
  dataSource = new MatTableDataSource<IAgenda>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agendaList'] && this.agendaList) {
      console.log('Agenda recebida:', this.agendaList);
      this.dataSource.data = this.agendaList; // Atualiza a tabela com os dados
      
      // Atribui o paginator após atualizar a dataSource
      setTimeout(() => {
        this.dataSource.paginator = this.paginator; // Garante que o paginator será aplicado
      });
    }
  }
  
  @Output() agendaSelectedEmitter = new EventEmitter<IAgenda>();

  onAgendaSelected(agenda: IAgenda) {
    console.log('Agendamento Selecionado:', agenda);
    this.agendaSelectedEmitter.emit(agenda);
  }
}

