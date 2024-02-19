import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {response} from "express";
import {Ctx, MessagePattern, Payload, RedisContext} from "@nestjs/microservices";
import {GameRoom} from 'gameinterface/models'

@WebSocketGateway({
  cors: true,
})
export class QuizGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  rooms: GameRoom[] = [];


  constructor() {}

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected 🎉: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id);
  }

  roomUsersCount: Record<string, number> = {};

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, { roomId, isPrivate }: { roomId: string; isPrivate: boolean }) {
    if (isPrivate) {
      // Handle joining a private room
      this.joinPrivateRoom(client, roomId);
    } else {
      // Handle joining or creating a public room with a limit of 10 clients
      this.joinOrCreatePublicRoom(client, roomId);
    }
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, { roomId, theme, isPrivate, admin }: GameRoom) {
    const existingRoom = this.rooms.find((room) => room.roomId === roomId);

    if (existingRoom) {
      // Notify the client that the room ID is already in use
      client.emit('roomCreationError', 'Room ID is already in use');
    } else {
      // Create a new room
      const newRoom: GameRoom = {
        roomId: roomId,
        clients: [client],
        theme,
        isPrivate,
        admin,
      };

      this.rooms.push(newRoom);
      client.join(roomId);
      client.emit('roomCreated', 'Room created successfully');
    }
  }

  // Add more event handlers for quiz challenges, answers, etc.

  private joinPrivateRoom(client: Socket, roomId: string) {
    // Handle joining a private room
    client.join(roomId);
    client.emit('roomJoined', `You've joined the private room ${roomId}`);
  }

  private joinOrCreatePublicRoom(client: Socket, roomId: string) {
    const publicRoom = this.rooms.find((room) => room.roomId === roomId);

    if (!publicRoom) {
      // Create a new public room if it doesn't exist
      this.createPublicRoom(client, roomId);
    } else if (publicRoom.clients.length < 10) {
      // Join the existing public room if there are fewer than 10 clients
      this.joinPublicRoom(client, publicRoom);
    } else {
      // Notify the client that the public room is full
      client.emit('roomFull', 'The public room is full');
    }
  }

  private createPublicRoom(client: Socket, roomId: string) {
    // Handle creating a new public room
    const newRoom: GameRoom = {
      roomId: roomId,
      clients: [client],
      theme: '', // Set the theme as needed
      isPrivate: false,
      admin: {
        id: client.id,
        username: 'Admin', // Set the admin username as needed
        score: 0,
        isAdmin: true,
      },
    };

    this.rooms.push(newRoom);
    client.join(roomId);
    client.emit('roomCreated', 'Room created successfully');
  }

  private joinPublicRoom(client: Socket, room: GameRoom) {
    // Handle joining an existing public room
    room.clients.push(client);
    client.join(room.roomId);
    client.emit('roomJoined', `You've joined the public room ${room.roomId}`);
  }


}
