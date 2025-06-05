import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { IPerfilMedico } from '../../interfaces/perfilMedico.interface';
import { MatSelectModule } from '@angular/material/select';

interface Especialidade {
  value: string | undefined;
  viewValue: string;
}

@Component({
  selector: 'app-perfil-inputs',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './perfil-inputs.component.html',
  styleUrl: './perfil-inputs.component.css'
})
export class PerfilInputsComponent {

  private readonly _authService = inject(AuthService);
  @Output('atualizarPerfil') onAtualizarPerfilEmmiter = new EventEmitter<IPerfilMedico>;

  type_acess: string = this._authService.getUserScopes();

  especialidadeList: Especialidade[] = [
    {value: 'Cardiologista', viewValue: 'Cardiologista'},
    {value: 'Ortopedista', viewValue: 'Ortopedista'},
    {value: 'Pediatria', viewValue: 'Pediatria'},
  ];

  perfilMedico:IPerfilMedico = {
    crm: undefined,
    especialidade: undefined,
    nome_usuario: undefined,
    email: undefined,
    cpf: undefined,
    senha: undefined,
  }
  onAtualizarPerfil() {
    console.log('dados', this.perfilMedico);
    this.onAtualizarPerfilEmmiter.emit(this.perfilMedico);
  }
}
