import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { SoapService } from '../../../../services/soap.service';

interface CiapItem {
  codigo: string;
  descricao: string;
}

interface ISubjetivo {
  subjetivo: string | undefined;
  CIAP2 : string |undefined;
}


@Component({
  selector: 'app-subjetivo',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButton
  ],
  templateUrl: './subjetivo.component.html',
  styleUrl: './subjetivo.component.css'
})
export class SubjetivoComponent implements OnInit {

  ciapControl = new FormControl('');
  filteredCiap!: Observable<CiapItem[]>;

  displayCiap(item: CiapItem): string {
    return item ? `${item.codigo} - ${item.descricao}` : '';
  }

  subjetivo:ISubjetivo = {
    subjetivo: undefined,
    CIAP2: undefined,
  }

  ngOnInit(): void {
    this.subjetivo = this._soapService.getSubjetivo() ?? { subjetivo: undefined, CIAP2: undefined };

    this.filteredCiap = this.ciapControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
 

  private _filter(value: string): CiapItem[] {
    const filterValue = value;

    return this.ciapList.filter(item =>
      item.codigo.toLowerCase().includes(filterValue) ||
      item.descricao.toLowerCase().includes(filterValue)
    );
  }

  

  private readonly _soapService = inject(SoapService);

  onSalvarSubjetivo() {
    this._soapService.setSubjetivo(this.subjetivo);
    console.log('subjetivo',this.subjetivo)
  }

  ciapList: CiapItem[] = [
    { codigo: 'A01', descricao: 'Sensação de mal-estar geral' },
    { codigo: 'A02', descricao: 'Calafrios' },
    { codigo: 'A03', descricao: 'Febre' },
    { codigo: 'A04', descricao: 'Dor generalizada/múltipla' },
    { codigo: 'A05', descricao: 'Fadiga' },
    { codigo: 'A06', descricao: 'Desmaios/síncope' },
    { codigo: 'A07', descricao: 'Perda de consciência' },
    { codigo: 'A08', descricao: 'Hemorragia/hemato de origem desconhecida' },
    { codigo: 'A09', descricao: 'Suor excessivo' },
    { codigo: 'A10', descricao: 'Edema generalizado' },
    { codigo: 'A11', descricao: 'Inquietação' },
    { codigo: 'A13', descricao: 'Medo de doença grave' },
    { codigo: 'A15', descricao: 'Problema/queixa relacionado à múltiplas regiões' },
    { codigo: 'A20', descricao: 'Teste de diagnóstico/procedimento geral anormal' },
    { codigo: 'A21', descricao: 'Infecção viral/suspeita' },
    { codigo: 'A23', descricao: 'Infecção bacteriana/suspeita' },
    { codigo: 'A25', descricao: 'Infecção parasitária/suspeita' },
    { codigo: 'A26', descricao: 'Infecção micótica/suspeita' },
    { codigo: 'A27', descricao: 'Infecção por protozoários' },
    { codigo: 'A28', descricao: 'Outras infecções específicas' },
    { codigo: 'A29', descricao: 'Doença geral, outra não especificada' },
    { codigo: 'A70', descricao: 'Doença infecciosa/parasitária' },
    { codigo: 'A71', descricao: 'Sarampo' },
    { codigo: 'A72', descricao: 'Rubéola' },
    { codigo: 'A73', descricao: 'Caxumba' },
    { codigo: 'A74', descricao: 'Varicela' },
    { codigo: 'A75', descricao: 'Mononucleose infecciosa' },
    { codigo: 'A76', descricao: 'Escarlatina' },
    { codigo: 'A77', descricao: 'Tétano' },
    { codigo: 'A78', descricao: 'Febre tifóide e paratifóide' },
    { codigo: 'A79', descricao: 'Doenças infecciosas/parasitárias, outras' },
    { codigo: 'A80', descricao: 'Tuberculose' },
    { codigo: 'A81', descricao: 'Malária' },
    { codigo: 'A82', descricao: 'Doença do sono (tripanossomíase)' },
    { codigo: 'A83', descricao: 'Esquistossomose' },
    { codigo: 'A84', descricao: 'Ancilostomíase' },
    { codigo: 'A85', descricao: 'Outras helmintíases' },
    { codigo: 'A86', descricao: 'Amebíase' },
    { codigo: 'A87', descricao: 'Leishmaniose' },
    { codigo: 'A88', descricao: 'Doença de Chagas' },
    { codigo: 'A89', descricao: 'Infecção parasitária, outra' },
    { codigo: 'A90', descricao: 'HIV positivo/infecção por HIV' },
    { codigo: 'A91', descricao: 'AIDS' },
    { codigo: 'A92', descricao: 'Vacinação/profilaxia' },
    { codigo: 'A93', descricao: 'Reação adversa à vacinação' },
    { codigo: 'A94', descricao: 'Reação adversa a medicamento' },
    { codigo: 'A95', descricao: 'Reação adversa a alimento' },
    { codigo: 'A96', descricao: 'Reação adversa a outra substância' },
    { codigo: 'A97', descricao: 'Problema social' },
    { codigo: 'A98', descricao: 'Problema administrativo' },
    { codigo: 'A99', descricao: 'Outro problema geral não especificado' },
  ];
  
}
