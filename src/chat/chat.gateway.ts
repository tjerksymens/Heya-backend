import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './services';
import { CreateMessageDto } from './dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() public server: Server;

    public constructor(private readonly chatService: ChatService) {}

    public async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    public async handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('sendMessage')
    public async handleMessage(client: Socket, payload: CreateMessageDto): Promise<void> {
        const message = await this.chatService.createMessage(payload);
        this.server.emit('receiveMessage', message);
    }
}
