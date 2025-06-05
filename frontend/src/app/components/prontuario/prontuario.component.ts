import { Component, inject } from '@angular/core';
import { TollbarheaderComponent } from "../../components-angular-material/tollbarheader/tollbarheader.component";
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SoapService } from '../../services/soap.service';
import { ISoap } from '../../interfaces/soap/soap.interface';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-prontuario',
  imports: [TollbarheaderComponent, MatDivider,MatButtonModule, RouterOutlet, RouterModule],
  templateUrl: './prontuario.component.html',
  styleUrl: './prontuario.component.css'
})




export class ProntuarioComponent {

  private readonly _router= inject(Router);
  private readonly _soapService = inject(SoapService);
  soapactivated: boolean = false;

  soap: ISoap = {
    id_consulta:undefined,
    subjetivo: undefined,
    objetivo: undefined,
    avaliacao: undefined,
    plano: undefined
  }
  activateSoap() {
    this.soapactivated= true;
  }
  deactivateSoap(){
    this.soapactivated = false;
  }
  onSalvarSoap() {
    this.soap = this._soapService.getSOAPCompleto()
    console.log('soap no prontuario', this.soap);
  }
  onFinalizarConsulta() {
    console.log('Dados enviados para o backend:', this.soap); 

    this._soapService.finalizarConsulta(this.soap).subscribe({
      next:(res) =>{
        console.log('Consulta Finalizada',res);
        this._router.navigate(['/medico-dashboard']);

      },
      error:(err)=>{
        console.error('Erro ao finalizar consulta', err);
      }
    })
    this._soapService.clearAll();
  }


  
  
}
