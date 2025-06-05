import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface IUser {
  id_usuario: number;
  nome_usuario: string ;
  email: string ;
  id_perfil_acesso: number;
}

interface IAcess {
  id_usuario: number;
  type_acess: string;
}

@Injectable({
  providedIn: 'root'
})
export class GerenciarAcessoService {

  private readonly _httlClient = inject(HttpClient);
  getUserWithoutAcessList(): Observable<IUser[]>{
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httlClient.get<IUser[]>('http://localhost:3000/api/get-users-without-acess', { headers }).pipe(
      tap(resp => console.log('Dados Recebidos no Front:', resp)) // Debug para ver a resposta no console
    );
  };

  giveAcess(acess : IAcess): Observable<void>{
    const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
    return this._httlClient.post<void>('http://localhost:3000/api/give-acess', acess, {headers}).pipe(
      tap(() => console.log('Concluido')) // Apenas para debug
    )
  }
  
}
