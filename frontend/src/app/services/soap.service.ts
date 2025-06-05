import { inject, Injectable } from '@angular/core';
import { IObjetivo } from '../interfaces/soap/objetivo.interface';
import { ISubjetivo } from '../interfaces/soap/subjetico.interface';
import { IAvaliacao } from '../interfaces/soap/avaliacao.interface';
import { ISoap } from '../interfaces/soap/soap.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';





export interface IPlano {
  condutas: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  private readonly _httpClient = inject(HttpClient);

  private id_consulta: number| undefined;
  private subjetivo: ISubjetivo | undefined;
  private objetivo: IObjetivo | undefined;
  private avaliacao: IAvaliacao | undefined;
  private plano: IPlano | undefined;
  private id_prontuario: number | undefined;

  setIdProntuario(id: number) {
    this.id_prontuario = id;
  }

  getIdProntuario(): number | undefined {
    return this.id_prontuario;
  }
  setSubjetivo(data: ISubjetivo) {
    this.subjetivo = data;
  }

  getSubjetivo(): ISubjetivo | undefined {
    return this.subjetivo;
  }

  setObjetivo(data: IObjetivo) {
    this.objetivo = data;
  }

  getObjetivo(): IObjetivo | undefined {
    return this.objetivo;
  }

  setAvaliacao(data: IAvaliacao) {
    this.avaliacao = data;
  }

  getAvaliacao(): IAvaliacao | undefined {
    return this.avaliacao;
  }

  setPlano(data: IPlano) {
    this.plano = data;
  }

  getPlano(): IPlano | undefined {
    return this.plano;
  }

  setIdConsulta(data:number){
    this.id_consulta = data;
  }
  getIdConsulta(){
    return this.id_consulta;
  }



  getSOAPCompleto(): ISoap  {
    return {
      id_consulta: this.id_consulta,  
      subjetivo: this.subjetivo,
      objetivo: this.objetivo,
      avaliacao: this.avaliacao,
      plano: this.plano
    };
  }

  clearAll() {
    this.subjetivo = undefined;
    this.objetivo = undefined;
    this.avaliacao = undefined;
    this.plano = undefined;
  }


  finalizarConsulta(soap:ISoap):Observable<void>{
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
            return this._httpClient.post<void>('http://localhost:3000/api/finalizar-consulta', soap, {headers}).pipe(
                  tap(() => console.log('enviada ao back')) // Apenas para debug
                )
  }

}
