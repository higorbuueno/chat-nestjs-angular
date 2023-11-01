import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Login } from 'src/model/login';
import { Mensagem } from 'src/model/mensagem';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server

  rooms: string[];

  handleConnection(client: any, ...args: any[]) {
    console.log("Usuário conectado")
  }

  handleDisconnect(client: any) {
    console.log("Usuário desconectado")
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, message: Mensagem) {
    this.server.to(message.sala).emit('newMessage', message);
    console.log(socket);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, login: Login) {
    socket.join(login.sala)
    socket.emit('joinedRoom', login);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(socket: Socket, login: Login) {
    this.server.socketsLeave(login.sala)
    socket.emit('leftRoom', login);
  }
}
