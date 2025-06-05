import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SoapService } from '../../../../services/soap.service';
import { IObjetivo } from '../../../../interfaces/soap/objetivo.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-objetivo',
  imports: [MatInputModule,MatButton,FormsModule],
  templateUrl: './objetivo.component.html',
  styleUrl: './objetivo.component.css'
})
export class ObjetivoComponent implements OnInit {

  ngOnInit(): void {
    this.objetivo = this._soapService.getObjetivo() ?? { 
      objetivo: undefined,
      perimetroCefalico: undefined,
      peso: undefined,
      altura: undefined,
      indiceMassaCorporea: undefined,
      perimetroPanturrilha: undefined,
      pressaoArterial: undefined,
      frequenciaRespiratoria: undefined,
      frequenciaCardiaca: undefined,
      temperatura: undefined,
      saturacaoO2: undefined,
      glicemia: undefined };
  }

  objetivo : IObjetivo = {
    objetivo: undefined,
    perimetroCefalico: undefined,
    peso: undefined,
    altura: undefined,
    indiceMassaCorporea: undefined,
    perimetroPanturrilha: undefined,
    pressaoArterial: undefined,
    frequenciaRespiratoria: undefined,
    frequenciaCardiaca: undefined,
    temperatura: undefined,
    saturacaoO2: undefined,
    glicemia: undefined
  }

  private readonly _soapService = inject(SoapService);

  onSalvarObjetivo(){
    this._soapService.setObjetivo(this.objetivo);
  }
}
