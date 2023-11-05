import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mensagem } from '../model/mensagem';

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
  * Função para buscar todas mensagens da sala;
  * @param sala 
  * @returns 
  */
  getAllBySala(sala = "") {
    const params = {
      sala: sala
    }
    return this._http.get<Mensagem[]>(`${environment.apiUrl}/api/chat/messages-by-room`, { params })
  }
}
