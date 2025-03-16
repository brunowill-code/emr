import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IAgendamento } from '../interfaces/agendamento.interface';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private readonly _httpClient = inject(HttpClient);

  getAtendimentos():Observable<IAgendamento[]>{
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.get<({ atendimentos: IAgendamento[] })>('http://localhost:3000/api/get-atendimento', {headers}).pipe(
          map(resp => {
            //console.log('resp', resp.agendamentos);
            if (resp?.atendimentos) {
              localStorage.setItem('agendamento', JSON.stringify(resp.atendimentos));
              return resp.atendimentos;
            }
            return [];
          })
        );
  }

  iniciarAtendimento(atendimento: IAgendamento):Observable<void>{
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.post<void>('http://localhost:3000/api/iniciar-atendimento', atendimento, {headers}).pipe(
      tap(() => console.log('Presença confirmada com sucesso')) // Apenas para debug
    )
  }

  }
