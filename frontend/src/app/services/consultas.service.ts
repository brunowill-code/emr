import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

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



@Injectable({
  providedIn: 'root'
})
export class ConsultasService {


  private readonly _httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/get-consultas-passadas';


  getConsultasPorProntuario(idProntuario: number): Observable<Consulta[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
  
    return this._httpClient.get<Consulta[]>(
      `http://localhost:3000/api/consultas-prontuario?idProntuario=${idProntuario}`,
      { headers }
    );
  }

}
