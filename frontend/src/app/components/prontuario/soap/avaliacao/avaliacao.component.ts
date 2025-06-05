import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IAvaliacao } from '../../../../interfaces/soap/avaliacao.interface';
import { tick } from '@angular/core/testing';
import { SoapService } from '../../../../services/soap.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avaliacao',
  imports: [    MatInputModule, MatButton, FormsModule
  ],
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.css'
})
export class AvaliacaoComponent implements OnInit {

  

  ngOnInit(): void {
    this.avaliacao = this._soapService.getAvaliacao() ?? {  avaliacao: undefined, CID: undefined,} 
  }
  
  private readonly _soapService = inject(SoapService);

  avaliacao: IAvaliacao = {
    avaliacao: undefined,
    CID: undefined,
  }

  onSalvarAvaliacao() {
    this._soapService.setAvaliacao(this.avaliacao);
  }


}
