import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {jwtDecode} from "jwt-decode";
import { map, Observable, tap } from "rxjs";
import { IPerfilMedico } from "../interfaces/perfilMedico.interface";


interface IUser {
    name: string | undefined;
    email: string | undefined;
    cpf:string | undefined;
    senha:string | undefined;
  }

@Injectable({
    providedIn: 'root',
})
export class AtualizarDadosService {
    private readonly _httpClient = inject(HttpClient);

    atualizarDados(updates:IPerfilMedico): Observable<void>{
        const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
        return this._httpClient.patch<void>('http://localhost:3000/api/atualizar-dados', updates, {headers}).pipe(
              tap(() => console.log('enviada ao back')) // Apenas para debug
        );
    };
}