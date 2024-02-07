import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Chat } from '../model/chat';
import { Mensagem } from '../model/mensagem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  chatAtual: Chat = { id: 1, data: new Date, sala: 'Raquel', ultimaMensagem: { autor: 'Raquel', data: new Date(), sala: 'HigorERaquel', texto: 'Oieee amorrrr, tudo bem?' }, lido: true, ativo: true };

  chats: Chat[] = [
    { id: 1, data: new Date, sala: 'Raquel', ultimaMensagem: { autor: 'Raquel', data: new Date(), sala: 'HigorERaquel', texto: 'Oieee amorrrr, tudo bem?' }, lido: false, ativo: false },
    { id: 2, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 3, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true, isGrupo: true },
    { id: 4, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 5, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
    { id: 6, data: new Date, sala: 'Grupo', ultimaMensagem: { autor: 'Pedro', data: new Date(), sala: 'grupoxpto', texto: 'Salve, mensagem em grupo, teste para ellipsis hahaha' }, lido: true, ativo: true },
  ]

  autorLogado: string = "Higor";
  mensagens: Mensagem[] = [
    {
      autor: 'Higor',
      texto: ' Oi mor, tudo bem com você?',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Raquel',
      texto: 'Texte mensagem adfa dsfaçsdk façsldkj falksdj flkasdjf kajsdkf jadskjfdjfjkdjk fdkfd djfkjdk jkk  kj kj j daçlfjçasd k j k kjd kj ãkdf ~j fadslkjf asdj jhdfj hdajhf adshkskadjaksjdkjaskdj aksj kaskd kaskd aksjd kasjd lkçajdl gkfjasdçlk jaçsdlgj açlk jlkjtlekçsj ktei stesj ijtiae sjçadsfkj asdçf aidsjç hkaçsd fkasdj fçasdi jasçohgmaçlksd çksajf asdkçf jasçdklfaçsdklmãsjd kahio´~asjd',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Raquel',
      texto: 'Texte j fadslkjf aj fçasdi jasçohgmaçlksd çksajf asdkçfkahio´~asjd',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Higor',
      texto: 'aaaaaaaaaaaa',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Raquel',
      texto: 'kkkkkkkkkkkkkkkkk to testando o chat po',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Higor',
      texto: 'kkkkkkkkkkkkkk ufaa',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Higor',
      texto: 'Ficou bonitinho até né?',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Higor',
      texto: 'Pensando em trocar a cor das mensagens enviadas',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
    {
      autor: 'Raquel',
      texto: 'hmmmmmm, mas não ficou ruim não',
      data: new Date(),
      sala: 'teset',
      joiningAutor: false,
      leavingAutor: false,
    },
  ];

  selecionarChat(chat: Chat) {
    this.chatAtual.id = chat.id;
  }
}
