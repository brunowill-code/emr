import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SoapService } from '../../../services/soap.service';
import { ISoap } from '../../../interfaces/soap/soap.interface';


@Component({
  selector: 'app-soap',
  imports: [MatDivider, RouterOutlet, RouterModule],
  templateUrl: './soap.component.html',
  styleUrl: './soap.component.css'
})
export class SOAPComponent {

  soap: ISoap = {
    id_consulta:undefined,
    subjetivo: undefined,
    objetivo: undefined,
    avaliacao: undefined,
    plano: undefined
  }
  

  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute); //  rota atual
  private readonly _soapService = inject(SoapService)

  goTo(path: string) {
    this._router.navigate([path], { relativeTo: this._route });
  }

  emitSoap() {
    console.log('soap',this._soapService.getSOAPCompleto())
  }
}
