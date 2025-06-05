import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { IPlano, SoapService } from '../../../../services/soap.service';
import { tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plano',
  imports: [MatInputModule,MatButton,FormsModule],
  templateUrl: './plano.component.html',
  styleUrl: './plano.component.css'
})
export class PlanoComponent implements OnInit {
  
  ngOnInit(): void {
    this.plano = this._soapService.getPlano() ?? { condutas: undefined}
  }

  plano: IPlano ={
    condutas: undefined
  }

  private readonly _soapService = inject(SoapService);

  onSalvarPlano() {
  this._soapService.setPlano(this.plano);
}

}
