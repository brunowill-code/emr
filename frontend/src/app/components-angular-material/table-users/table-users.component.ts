import { DatePipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';

interface IUser {
  id_usuario: number;
  nome_usuario: string ;
  email: string ;
  id_perfil_acesso: number;
}


@Component({
  selector: 'app-table-users',
  imports: [MatTableModule, MatPaginatorModule,CommonModule],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  private readonly _authService = inject(AuthService);

  type_acess = this._authService.getUserScopes();

  @Input({ required: true }) usersList: IUser[] = [];
  @Output('userSelected') userSelectedEmitt = new EventEmitter<IUser>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nome_usuario', 'email'];
  dataSource = new MatTableDataSource<IUser>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.type_acess === 'paciente') {
      this.displayedColumns.push('status');
    }
  }

  ngOnChanges() {
    this.dataSource.data = this.usersList;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // 🔥 Garante que o paginator esteja sincronizado
  }

  onUserSelected(user: IUser) {
    this.userSelectedEmitt.emit(user);
  }
}
