import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {jwtDecode} from "jwt-decode";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _httpClient = inject(HttpClient);
    private readonly router = inject(Router);   // injeção do Router


        //faz um post ao servidor, enviando username e password e espera uma resposta que deve conter o token
        //usa o pipe para manipular a resposta
        //pipe() permite modificar a resposta antes de retorná-la
        //map(resp => ...) recebe a resposta {token: } e faz algo com ela
        //armazena o token no localStorage
        //Retorna a resposta pra quem chamou o método;

        login(username:string , password: string): Observable<{token : string}>{ 
            return this._httpClient.post<{token : string}>('http://localhost:3000/api/login', { username, password}).pipe( 
                map(resp => {
                    if(resp.token){
                        localStorage.setItem('acess-token', resp.token);

                    }
                    else {
                        console.error("Nenhum token recebido!");
                      }
                    return resp;
                }),
            );
        }
    verifyToken(): Observable<{ valid: boolean; user: any; }>{
        //verifica se o token de autenticação armazenado no local storage ainda é válido.
        // faz isso enviando uma requisição get para o backend com o token no cabeçalho Authorization.
        //obtem o token do localstorage localStorage.getItem('acess-token')
        //cria um cabeçalho http const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
        // faz a requisição get para o backend, o backend verifica se o token é válido e retorna uma resposta
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('acess-token'));
        return this._httpClient.get<{ valid:boolean;user:string; }>('http://localhost:3000/api/verify-token', {headers});
    }
    getUserScopes():string{
        const token = localStorage.getItem('acess-token');
        if(!token) {
            return "";
        } 
        const decoded: any = jwtDecode(token);
        return decoded.scopes; 
    }

    getUserProfile():string{
        const token = localStorage.getItem('acess-token');
        if(!token) {
            return "";
        } 
        const decoded: any = jwtDecode(token);
        return decoded.profile;
    }
    logout(): void {
        localStorage.removeItem('acess-token'); // remove o token
        this.router.navigate(['/']); // redireciona para página inicial
      }
}