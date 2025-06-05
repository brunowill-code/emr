import { DatePipe, CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ISolicitacao } from '../../../interfaces/solicitacao.interface';
import { IAgendamento } from '../../../interfaces/agendamento.interface';

@Component({
  selector: 'app-table-solicitacao',
  imports: [MatTableModule, MatPaginatorModule, DatePipe,CommonModule],
  templateUrl: './table-solicitacao.component.html',
  styleUrl: './table-solicitacao.component.css'
})
export class TableSolicitacaoComponent implements AfterViewInit, OnChanges    {

  


  @Input({ required: true }) solicitacaoList: ISolicitacao[] = [];
  @Output('solicitacaoSelected') agendamentoSelectedEmitt = new EventEmitter<ISolicitacao>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['data_solicitacao', 'tipo_especialidade', 'status'];
  dataSource = new MatTableDataSource<ISolicitacao>();

  constructor(private cdr: ChangeDetectorRef) {}


  ngOnChanges() {
    this.dataSource.data = this.solicitacaoList;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // 🔥 Garante que o paginator esteja sincronizado
  }
  onAgendamentoSelected(solicitacao: ISolicitacao) {
    this.agendamentoSelectedEmitt.emit(solicitacao);
  }
}
