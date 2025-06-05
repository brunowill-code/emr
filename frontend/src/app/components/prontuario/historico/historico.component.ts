import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConsultasService } from '../../../services/consultas.service';
import { SoapService } from '../../../services/soap.service';


interface Consulta {
  id_consulta: number;
  id_prontuario: number;
  data_consulta: string;
  subjetivo: any;
  objetivo: any;
  avaliacao: any;
  plano: any;
  nome_profissional: string;
}



@Component({
  selector: 'app-historico',
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit { 

  private readonly _consultaService= inject(ConsultasService)
  private readonly _soapService = inject(SoapService);
  consultas: Consulta[] = [];

  ngOnInit() {
    const idProntuario = this._soapService.getIdProntuario();
    if (idProntuario !== undefined) {
      console.log('enviando ao back', idProntuario)
      this._consultaService.getConsultasPorProntuario(idProntuario).subscribe(data => {
        this.consultas = data;
        console.log(this.consultas);
      });
    } else {
      console.warn('ID do prontuário não definido.');
      // Aqui você pode redirecionar ou mostrar uma mensagem na tela, se quiser
    }
  }

}
