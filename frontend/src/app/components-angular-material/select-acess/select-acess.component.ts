import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

interface IUser {
  id_usuario: number;
  nome_usuario: string ;
  email: string ;
  id_perfil_acesso: number;
}

interface IAcesso {
  value: number;
  viewValue: string;
}

interface IAcess {
  id_usuario: number;
  type_acess: string;
}


@Component({
  selector: 'app-select-acess',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule , MatButtonModule],
  templateUrl: './select-acess.component.html',
  styleUrl: './select-acess.component.css'
})
export class SelectAcessComponent {


  acessoSelecionado?: IAcesso;
  guivenAcess : IAcess = {} as IAcess;

  @Input({required: true}) usuario : IUser = {} as IUser;


  @Output('onAcessSelected') onAcessSelected = new EventEmitter <IAcess>();

  acessos: IAcesso[] = [
    {value: 0, viewValue: 'Paciente'},
    {value: 1, viewValue: 'Tecnico'},
    {value: 2, viewValue: 'Medico'},
    {value: 3, viewValue:'Admin'},
  ];

  selecionarAcesso(value: number) {
    this.acessoSelecionado = this.acessos.find(acesso => acesso.value === value);
    console.log(this.acessoSelecionado);
    console.log('usuario', this.usuario);
  }

  onGiveAcess() {
    if(this.acessoSelecionado){
      this.guivenAcess.id_usuario = this.usuario.id_usuario;
      this.guivenAcess.type_acess = this.acessoSelecionado.viewValue;
      console.log(this.guivenAcess);

      this.onAcessSelected.emit(this.guivenAcess);
    }
    else{
      console.log('nenhum acesso selecionado');
    }
    
  }

}
