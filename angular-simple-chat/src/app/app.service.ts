import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  _loggedUser$ = new BehaviorSubject<Usuario>({});

  setUsuarioSubject(usuario: Usuario) {
    this._loggedUser$.next(usuario);
  }

  getUsuarioSubject() {
    return this._loggedUser$.asObservable();
  }
}
