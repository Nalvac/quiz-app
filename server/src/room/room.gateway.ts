import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameRoom } from 'gameinterface/models';
import { RoomsService } from './room.service';

@WebSocketGateway()
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  rooms: GameRoom[] = [];

  constructor(private roomSrv: RoomsService) {}
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    this.rooms = this.rooms.map((room) => {
      if (room.clients.includes(client)) {
        room.clients = room.clients.filter((c) => c !== client);
        console.log(`Client ${client.id} removed from room ${room.roomId}`);
      }
      return room;
    });

    this.rooms = this.rooms.filter((room) => room.createBY.id !== client.id);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected 💪: ${client.id}`);
    client.emit('clientId', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    client: Socket,
    {
      roomId,
      isPrivate,
      password,
    }: { roomId?: string; isPrivate?: boolean; password?: string },
  ) {
    if (isPrivate) {
      this.joinPrivateRoom(client, roomId, password);
    } else {
      console.log('ici');
      this.joinOrCreatePublicRoom(client);
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
      themes: roomConfig.themes,
      isPrivate: true,
      createBY: client,
      name: roomConfig.name,
      password: roomConfig.password,
      userName: roomConfig.userName,
    };

    this.rooms.push(newRoom);
    client.join(roomId);
    client.emit(
      'roomCreated',
      `Room created successfully ${newRoom.createBY.id}`,
    );

    console.log(roomConfig.themes);

    this.roomSrv.generateQuestions(roomConfig.themes, 4).then((questions) => {
      newRoom.questions = questions;
    });
  }

  @SubscribeMessage('startGame')
  handleStartGame(client: Socket, data: { roomId }) {
    this.startGame(client, data.roomId);
  }

  private startGame(client: Socket, roomId: string) {
    const room = this.getRoomById(roomId);
    if (room) {
      const questions = room.questions;
      room.clients.forEach((c) => {
        this.server
          .to(c.id)
          .emit('gameStarted', { isStarted: true, questions });
      });
    } else {
      client.emit('gameStarted', { isStarted: true });
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
        room.clients = [...room.clients, client];
      }

      room.clients.forEach((e) => {
        console.log(e.id);
      });

      const clientsCount = room.clients.length;

      if (room.createBY.id == client.id) {
        client.emit('roomJoined', {
          message: `New user joined the private room ${roomId}`,
          clientsCount: clientsCount,
          isAdmin: true,
          roomId: room.roomId,
        });
      } else {
        client.emit('roomJoined', {
          message: `You've joined the private room ${roomId}`,
          clientsCount: clientsCount,
          isAdmin: false,
          roomId: room.roomId,
        });
      }

      this.server.to(room.createBY.id).emit('clientCount', {
        clientsCount: clientsCount,
      });
    } else {
      client.emit('roomJoined', 'Invalid room or password');
    }
  }

  private joinOrCreatePublicRoom(client: Socket) {
    const publicRooms = this.rooms.filter(
      (room) => !room.isPrivate && room.clients.length < 10,
    );

    if (publicRooms.length === 0) {
      this.createPublicRoom(client);
    } else {
      const publicRoom = publicRooms[0];
      this.joinPublicRoom(client, publicRoom);
      this.notifyClientCount(publicRoom);
    }
  }

  private createPublicRoom(client: Socket) {
    const roomId = this.generateRandomRoomId();
    const newRoom: GameRoom = {
      difficultyLevels: 'Facile',
      randomTheme: false,
      roomId: roomId,
      clients: [client],
      themes: ['SCIENCE'],
      isPrivate: false,
      createBY: client,
    };

    this.rooms.push(newRoom);
    client.join(roomId);
    client.emit('roomJoined', `You've joined the public room ${roomId}`);
  }

  private joinPublicRoom(client: Socket, room: GameRoom) {
    room.clients.push(client);
    client.join(room.roomId);
    client.emit('roomJoined', `You've joined the public room ${room.roomId}`);
  }

  private notifyClientCount(room: GameRoom) {
    const clientsCount = room.clients.length;
    this.server.to(room.roomId).emit('clientCount', {
      clientsCount,
    });
  }
}
