import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Mensagem } from '../model/mensagem';
import { LoginComponent } from './login/login.component';
import { Login } from '../model/login';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  autorLogado: string = "";
  salaAtual: string = "";

  texto: string = "";

  private _unsubscribeAll = new Subject<any>();

  mensagens = [] as Mensagem[];

  constructor(
    private _chatService: ChatService,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.realizarLogin();
  }

  /**
 * On destroy
 */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  realizarLogin() {
    const modalRef = this._modalService.open(LoginComponent, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
      keyboard: false
    });

    modalRef.result.then((login: Login) => {
      if (login) {
        this.joinRoomAndSubscribeMessages(login);
        this.autorLogado = login.autor
        this.salaAtual = login.sala
      }
    })

  }
  
  joinRoomAndSubscribeMessages(login: Login) {

    this._chatService.joinRoom(login);

    this._chatService.getNewMessage().pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (newMessage => {
        this.mensagens.push(newMessage);
      })
    })

    this._chatService.listerJoiningUsers().pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (newUser => {
        this.mensagens.push({autor: newUser.autor, sala: newUser.sala, data: new Date(), texto: "", joiningAutor: true});
      })
    })
  }

  sendMessage(): void {
    if (this.texto && this.autorLogado) {
      const mensagem: Mensagem = {
        autor: this.autorLogado,
        texto: this.texto,
        sala: this.salaAtual,
        data: new Date()
      }
      this._chatService.sendMessage(mensagem);
      this.texto = "";
    }
  }
}
