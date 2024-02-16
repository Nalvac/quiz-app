import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {response} from "express";

@WebSocketGateway({
  cors: true,
})
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;


  constructor() {}

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected 🎉: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id);
  }

}
