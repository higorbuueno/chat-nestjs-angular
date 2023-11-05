import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { Mensagem } from '../model/mensagem';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _socket: Socket) { }

  sendMessage(message: Mensagem) {
    this._socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<Mensagem> {
    return this._socket.fromEvent<Mensagem>('chatEvent');
  }

  joinRoom(login: Login) {
    this._socket.emit('joinRoom', login);
  }

  leaveRoom(login: Login) {
    this._socket.emit('leaveRoom', login);
  }
}
