import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  autor: string = "";
  sala: string = "";
  submited: boolean = false;

  constructor(
    private _activeModal: NgbActiveModal
  ) { }

  logar() {
    this.submited = true;
    if (this.autor) {
      const login: Login = {
        autor: this.autor,
        sala: this.sala
      }
      
      this._activeModal.close(login)
    }
  }
}
