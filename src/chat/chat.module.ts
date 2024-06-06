import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './services';
import { ChatController } from './controllers';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    controllers: [ChatController],
    providers: [ChatGateway, ChatService, ChatController],
    exports: [ChatGateway, ChatService, ChatController],
})
export class ChatModule {}
