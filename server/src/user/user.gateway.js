import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({
    cors: true,
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;


    handleDisconnect(client: Socket) {
        console.log(`Client disconnected 🎉: ${client.id}`);
    }

    handleConnection(client: Socket) {
        console.log(`Client connected 💪: ${client.id}`);
        client.emit('clientId', client.id);
    }

}
