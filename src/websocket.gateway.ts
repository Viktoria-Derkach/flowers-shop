import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('websock inited');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnected', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', `Echo : ${message}`);
  }
}
