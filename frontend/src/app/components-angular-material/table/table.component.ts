import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnChanges, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IAgendamento } from '../../interfaces/agendamento.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { HorarioPipe } from "../../pipes/horario.pipe";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, DatePipe, HorarioPipe,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnChanges , OnInit {

  private readonly _authService = inject(AuthService);

  type_acess = this._authService.getUserScopes();

  @Input({ required: true }) agendamentoList: IAgendamento[] = [];
  @Output('agendamentoSelected') agendamentoSelectedEmitt = new EventEmitter<IAgendamento>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['hora_agendamento', 'data_agendamento', 'nome_profissional', 'especialidade', 'nome_paciente'];
  dataSource = new MatTableDataSource<IAgendamento>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.type_acess === 'paciente') {
      this.displayedColumns.push('status');
    }
  }

  ngOnChanges() {
    this.dataSource.data = this.agendamentoList;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // 🔥 Garante que o paginator esteja sincronizado
  }

  onAgendamentoSelected(agendamento: IAgendamento) {
    this.agendamentoSelectedEmitt.emit(agendamento);
  }
}
