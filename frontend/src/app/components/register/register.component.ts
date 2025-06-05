import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

interface IUser {
  name: string | undefined;
  email: string | undefined;
  cpf:string | undefined;
  senha:string | undefined;
}


@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly _registerService = inject(RegisterService)

  User: IUser = {
    name: undefined,
    email: undefined,
    cpf: undefined,
    senha: undefined
  }

  esconderSenha = true;


  temMinimo = false;
  temMaiuscula = false;
  temMinuscula = false;
  temNumero = false;
  temEspecial = false;
  
  validarSenha() {
    const senha = this.User.senha || '';
    this.temMinimo = senha.length >= 8;
    this.temMaiuscula = /[A-Z]/.test(senha);
    this.temMinuscula = /[a-z]/.test(senha);
    this.temNumero = /[0-9]/.test(senha);
    this.temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  }

  onRegister() {
    this._registerService.register(this.User).subscribe({
      next:(_) => {
        console.log('back chamado');
        this._router.navigate(['login']);

      },
      error:(err) =>{
        console.error('Erro ao buscar agendamentos:', err);
      }
    }
    )
  }

  private readonly _router = inject(Router);

  onVoltar() {
    this._router.navigate(['login']);
  }
}