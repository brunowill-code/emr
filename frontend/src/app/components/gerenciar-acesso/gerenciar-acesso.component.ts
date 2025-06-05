import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { TableUsersComponent } from "../../components-angular-material/table-users/table-users.component";
import { GerenciarAcessoService } from '../../services/gerenciarAcesso.service';
import { tick } from '@angular/core/testing';
import { SelectAcessComponent } from "../../components-angular-material/select-acess/select-acess.component";
import { MatListModule } from '@angular/material/list';


interface IUser {
  id_usuario: number;
  nome_usuario: string ;
  email: string ;
  id_perfil_acesso: number;
}

interface IAcess {
  id_usuario: number;
  type_acess: string;
}
@Component({
  selector: 'app-gerenciar-acesso',
  imports: [TollbarheaderComponent, MatDivider, TableUsersComponent, SelectAcessComponent,MatListModule],
  templateUrl: './gerenciar-acesso.component.html',
  styleUrl: './gerenciar-acesso.component.css'
})
export class GerenciarAcessoComponent {


  usersList: IUser[]= []
  userSelected : IUser = {} as IUser;

  private readonly _gerenciarAcessoService = inject(GerenciarAcessoService)

  constructor(){
    this.getUsersList()
  }
  getUsersList() {
    this._gerenciarAcessoService.getUserWithoutAcessList().subscribe({
      next:(resp) =>{
        console.log('Dados Recebidos:', resp);
        this.usersList = resp;
      },
      error: (err) => {
        console.error('Erro ao buscar agendamentos:', err);
      }
    })
  }

  showUserDetails : boolean = false;
  onUserSelected(user: IUser) {
    console.log('user no pai', user);
    this.userSelected = user;
    this.showUserDetails = true;
  }
  onGiveAcess(acesso: IAcess) {
    console.log('acesson no pai', acesso);
    this._gerenciarAcessoService.giveAcess(acesso).subscribe({
      next: () =>{
        console.log('backend chamado');
        this.getUsersList();
      },
      error(err) {
        console.log('Erro ao dar acesso', err);
      },
    })
  }
}
