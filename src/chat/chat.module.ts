import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema';
import { UserModule } from '../users/user.module';
import { ChatService } from './services';
import { ChatController } from './controllers';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]), UserModule],
    controllers: [ChatController],
    providers: [ChatGateway, ChatService, ChatController],
    exports: [ChatGateway, ChatService, ChatController],
})
export class ChatModule {}
