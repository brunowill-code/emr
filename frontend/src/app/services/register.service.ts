import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {jwtDecode} from "jwt-decode";
import { map, Observable, tap } from "rxjs";


interface IUser {
    name: string | undefined;
    email: string | undefined;
    cpf:string | undefined;
    senha:string | undefined;
  }

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private readonly _httpClient = inject(HttpClient);

    register(user:IUser): Observable<void>{
        const headers = new HttpHeaders().set('Authorization','Bearer ' + localStorage.getItem('acess-token'));
        return this._httpClient.post<void>('http://localhost:3000/api/registrar', user, {headers}).pipe(
              tap(() => console.log('enviada ao back')) // Apenas para debug
            )

    }
}