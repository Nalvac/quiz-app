import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameRoom } from 'gameinterface/models';

@WebSocketGateway()
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  rooms: GameRoom[] = [];

  constructor() {}
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.rooms = this.rooms.map((room) => {
      if (room.clients.includes(client)) {
        room.clients = room.clients.filter((c) => c !== client);
        console.log(`Client ${client.id} removed from room ${room.roomId}`);
      }
      return room;
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id);
  }

  roomUsersCount: Record<string, number> = {};

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    {
      roomId,
      isPrivate,
      password,
    }: { roomId: string; isPrivate: boolean; password: string },
  ) {
    if (isPrivate) {
      this.joinPrivateRoom(client, roomId, password);
    } else {
      this.joinOrCreatePublicRoom(client, roomId);
    }
  }

  @SubscribeMessage('createRoom')
  handleCreateRoom(client: Socket, roomConfig: GameRoom) {
    const roomId = this.generateRandomRoomId();

    const existingRoom = this.rooms.find((room) => room.roomId === roomId);

    if (existingRoom) {
      return this.handleCreateRoom(client, roomConfig);
    }

    const newRoom: GameRoom = {
      difficultyLevels: roomConfig.difficultyLevels,
      randomTheme: roomConfig.randomTheme,
      roomId: roomId,
      clients: [client],
      theme: roomConfig.theme,
      isPrivate: true,
      createBY: client,
      name: roomConfig.name,
      password: roomConfig.password,
      userName: roomConfig.userName
    };

    this.rooms.push(newRoom);
    client.join(roomId);
    client.emit(
      'roomCreated',
      `Room created successfully ${newRoom.createBY.id}`,
    );
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: Socket, roomId: string) {
    this.startGame(client, roomId);
  }

  private startGame(client: Socket, roomId: string) {
    const room = this.getRoomById(roomId);

    if (room && room.createBY.id === client.id) {
      this.server.to(roomId).emit('gameStarted', {isStarted: true});
    } else {
      client.emit('gameStarted', {isStarted: true});
    }
  }

  private generateRandomRoomId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  private getRoomById(roomId: string): GameRoom | undefined {
    return this.rooms.find((room) => room.roomId === roomId);
  }

  private joinPrivateRoom(client: Socket, roomId: string, password: string) {
    const room = this.rooms.find((room) => room.name === roomId);

    if (room && room.password === password) {
      client.join(roomId);

      if (room.createBY.id != client.id) {
        room.clients.push(client);
      }

      const clientsCount = room.clients.length;

      if (room.createBY.id == client.id) {
        client.emit('roomJoined', {
          message: `New user joined the private room ${roomId}`,
          clientsCount: clientsCount,
          isAdmin: true,
          roomId: roomId,
        });
      } else {
        client.emit('roomJoined', {
          message: `You've joined the private room ${roomId}`,
          clientsCount: clientsCount,
          isAdmin: false,
          roomId: roomId,
        });
      }

      this.server.to(room.createBY.id).emit('clientCount', {
        clientsCount: clientsCount,
      })
    } else {
      client.emit('roomJoined', 'Invalid room or password');
    }
  }


  private joinOrCreatePublicRoom(client: Socket, roomId: string) {
    const publicRoom = this.rooms.find((room) => room.roomId === roomId);

    if (!publicRoom) {
      this.createPublicRoom();
    } else if (publicRoom.clients.length < 10) {
      this.joinPublicRoom(client, publicRoom);
    } else {
      client.emit('roomFull', 'The public room is full');
    }
  }

  private createPublicRoom() {}

  private joinPublicRoom(client: Socket, room: GameRoom) {
    room.clients.push(client);
    client.join(room.roomId);
    client.emit('roomJoined', `You've joined the public room ${room.roomId}`);
  }
}
