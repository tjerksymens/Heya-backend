import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas';
import { CreateMessageDto } from '../dto';

@Injectable()
export class ChatService {
    public constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    public async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }

    public async getMessages(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }
}
