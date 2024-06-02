import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './services';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    providers: [ChatGateway, ChatService],
})
export class ChatModule {}
