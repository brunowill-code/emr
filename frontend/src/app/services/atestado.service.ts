import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtestadoService {
  private readonly _httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/salvar-atestados'; // Altere se precisar

  constructor(private http: HttpClient) {}

  salvarAtestado(dados: any):Observable<void> {
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.post<void>('http://localhost:3000/api/salvar-atestados', dados, {headers}).pipe(
      tap(() => console.log('enviada ao back')) // Apenas para debug
    )
  }

  salvarExame(dados: any):Observable<void> {
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.post<void>('http://localhost:3000/api/salvar-exames', dados, {headers}).pipe(
      tap(() => console.log('enviada ao back')) // Apenas para debug
    )
  }

  salvarPrescricao(dados: any):Observable<void> {
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.post<void>('http://localhost:3000/api/salvar-prescricao', dados, {headers}).pipe(
      tap(() => console.log('enviada ao back')) // Apenas para debug
    )
  }
}


