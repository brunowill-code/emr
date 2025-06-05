import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);


  onRegister() {
    this._router.navigate(['register']);
  }

  onLogin() {
    console.log(this.loginForm.value.username,this.loginForm.value.password );
     this._authService.login( this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (_) =>{
        const role = this._authService.getUserScopes(); // Obtém o primeiro elemento do array scopes corretamente
        const profile = this._authService.getUserProfile();

        console.log('role',role);
        switch (role) {
          case 'aguardando_acesso':
            console.log('aguardando acesso');
            this._router.navigate(['/aguardando-acesso']);
            break;

          case 'admin':
            console.log("🔀 Redirecionando para /admin-dashboard");
            this._router.navigate(['/agendamento']);
            break;

          case 'super_user':
            console.log("🔀 Redirecionando para /super-user");
            this._router.navigate(['/gerenciar-acesso']);
            break;

          case 'medico':
            if(!profile){
              console.log('Perfil Incompleto');
              this._router.navigate(['/perfil']);
              break;
            }
            else{
              console.log("🔀 Redirecionando para /manager-dashboard");
              this._router.navigate(['/medico-dashboard']);
              console.log("✅ Navegação chamada com sucesso");
              break;
            }
            

          case 'tecnico':
            console.log("🔀 Redirecionando para /employee-dashboard");
            this._router.navigate(['/agendamento']);
            console.log("✅ Navegação chamada com sucesso");
            break;

          case 'paciente':
            console.log("🔀 Redirecionando para /client-dashboard");
            console.log("🔄 Tentando redirecionar...");
            this._router.navigate(['/paciente-dashboard']);
            console.log("✅ Navegação chamada com sucesso");
            break;

          default:
            console.log("🔀 Redirecionando para /default-dashboard");
            this._router.navigate(['/default-dashboard']);
        }
      },
      error: (error)  =>{
        console.log(error);
        const UNAUTHORIZED_CREDENTIALS_ERROR = 401; 

        if(error.status === UNAUTHORIZED_CREDENTIALS_ERROR){
          this.loginForm.setErrors({ invalidCredentials: true });
        } else {
          this.loginForm.setErrors({ generalCredentialsErros: true });
        }
      }
     })
       
      }
      
    
  }

