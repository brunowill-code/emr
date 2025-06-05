import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { PerfilInputsComponent } from "../../components-angular-material/perfil-inputs/perfil-inputs.component";
import { AuthService } from '../../services/auth.service';
import { IPerfilMedico } from '../../interfaces/perfilMedico.interface';
import { AtualizarDadosService } from '../../services/atualizarDados.service';

@Component({
  selector: 'app-perfil',
  imports: [TollbarheaderComponent, MatDivider, PerfilInputsComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  private readonly _authService = inject(AuthService);

  private readonly _atualizarDadosService = inject(AtualizarDadosService);

  type_acess: string = this._authService.getUserScopes();
  
  onAtualizarPerfil(perfil: IPerfilMedico) {
    console.log('perfil no pai', perfil);
    this._atualizarDadosService.atualizarDados(perfil).subscribe({
      next:() =>{
        console.log('Back chamado');
      },
      error:(err) =>{
        console.log('Erro ao chamar o back', err);
      }
    })
  }

  
}
