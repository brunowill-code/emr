import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { IAgendamento } from '../interfaces/agendamento.interface'
import { IAgenda } from '../interfaces/agenda.interface';
import { IFilterNewScheduling } from '../interfaces/filter/filter-new-scheduling.interface';
import { IFilterOptions } from '../interfaces/filter/filter-options.interface';
import { ISolicitacao } from '../interfaces/solicitacao.interface';

@Injectable({
  providedIn: 'root'
})

export class AgendamentoService {
  
  private readonly _httpClient = inject(HttpClient);

  getAgendamentos(): Observable<IAgendamento[]> {
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.get<{ agendamentos: IAgendamento[] }>('http://localhost:3000/api/agenda', {headers}).pipe(
      map(resp => {
        //console.log('resp', resp.agendamentos);
        if (resp?.agendamentos) {
          localStorage.setItem('agendamento', JSON.stringify(resp.agendamentos));
          return resp.agendamentos;
        }
        return [];
      })
    );
  }
  getAgenda(filterOptions: IFilterNewScheduling): Observable<IAgenda[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));

    return this._httpClient.post<{ agenda: IAgenda[] }>('http://localhost:3000/api/agenda-livre', { filterOptions }, { headers }).pipe(
      map(resp => resp?.agenda ?? []),
      catchError(error => {
        console.error("Erro ao buscar agenda:", error);
        return throwError(() => new Error("Erro ao buscar agenda."));
      })
    );
}

  desmarcarAgendamentos( agendamento: IAgendamento): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));

    return this._httpClient.post<void>('http://localhost:3000/api/desmarcar-consulta', agendamento , { headers }).pipe(
      tap(() => console.log('Agendamento desmarcado com sucesso')) // Apenas para debug
    );
  }

  confirmarPresenca(agendamento: IAgendamento): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));

    return this._httpClient.post<void>('http://localhost:3000/api/confirmar-presenca' , agendamento , { headers }).pipe(
      tap(() => console.log('Presença confirmada com sucesso')) // Apenas para debug
    );
  };

  marcarConsulta(agenda: IAgenda): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.post<void>('http://localhost:3000/api/marcar-consulta', agenda, { headers }).pipe(
      tap(() => console.log('Consulta Marcada com sucesso'))
    );
  }
  
  getAgendamentosByPacient():Observable<IAgendamento[]>{
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.get<{ agendamentos: IAgendamento[] }>('http://localhost:3000/api/agendamentos-pacientes', {headers}).pipe(
      map(resp => {
        //console.log('resp', resp.agendamentos);
        if (resp?.agendamentos) {
          return resp.agendamentos;
        }
        return [];
      })
    );
  }
  onSolicitar(agendamento:IFilterOptions ):Observable<void>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));

    return this._httpClient.post<void>('http://localhost:3000/api/solicitar-atendimento', agendamento , { headers }).pipe(
      tap(() => console.log('Agendamento desmarcado com sucesso')) // Apenas para debug
    );
  }

  getSolicitacoes():Observable<ISolicitacao[]>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.get<ISolicitacao[]>('http://localhost:3000/api/get-solicitacoes', { headers }).pipe(
      tap(resp => console.log('Dados Recebidos no Front:', resp)) // Debug para ver a resposta no console
    );
  }

  getAllSolicitacoes():Observable<ISolicitacao[]>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.get<ISolicitacao[]>('http://localhost:3000/api/get-all-solicitacoes', { headers }).pipe(
      tap(resp => console.log('Dados Recebidos no Front:', resp)) // Debug para ver a resposta no console
    );
  }
  rejeitarSolicitacao(solicitacao: ISolicitacao):Observable<void>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.patch<void>('http://localhost:3000/api/rejeitar-solicitacao',solicitacao, { headers }).pipe(
      tap(resp => console.log('Dados Recebidos no Front:', resp)) // Debug para ver a resposta no console
    )
  }

  aceitarSolicitacao(solicitacao: ISolicitacao):Observable<void>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
    return this._httpClient.patch<void>('http://localhost:3000/api/aceitar-solicitacao', solicitacao, { headers }).pipe(
      tap(resp => console.log('Dados Recebidos no Front:', resp)) // Debug para ver a resposta no console
    )
  }
}
