import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatEventDto } from '../../dto/chat-event';
import { Login } from '../../dto/login';
import { ChatService } from '../../chat.service';

@WebSocketGateway({
  namespace: 'chat-web-socket',
  cors: { origin: ['http://localhost:4200'] }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private _chatService: ChatService
  ) { }

  @WebSocketServer()
  server: Server

  rooms: string[];

  handleConnection(client: any, ...args: any[]) {
    // console.log("Usuário conectado");
  }

  handleDisconnect(client: any) {
    // console.log("Usuário desconectado")
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(socket: Socket, message: ChatEventDto) {
    const chatEvent = await this._chatService.create(message);
    this.server.to(message.sala).emit('chatEvent', chatEvent);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(socket: Socket, login: Login) {
    socket.join(login.sala)
    login.data = new Date();

    const mensagem: ChatEventDto = { autor: {name: login.autor, id: 1}, sala: login.sala, data: login.data, texto: "", joiningAutor: true }
    const chatEvent = await this._chatService.create(mensagem);
    socket.to(login.sala).emit('chatEvent', chatEvent);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(socket: Socket, login: Login) {
    socket.leave(login.sala)
    login.data = new Date();

    const mensagem: ChatEventDto = { autor: {name: login.autor, id: 1}, sala: login.sala, data: login.data, texto: "", leavingAutor: true }
    const chatEvent = await this._chatService.create(mensagem);
    socket.to(login.sala).emit('chatEvent', chatEvent);
  }
}
