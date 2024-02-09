import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
  * Função para realizar login;
  * @param login 
  * @returns 
  */
  login(login: Usuario) {
    return this._http.post<Token>(`${environment.apiUrl}/login`, login);
  }
}
