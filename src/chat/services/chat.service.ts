import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas';
import { MessageDto, SaveMessageDto } from '../dto';

@Injectable()
export class ChatService {
    public constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    public async getMessages(): Promise<MessageDto[]> {
        const messages = await this.messageModel.find().exec();
        return messages.map((message) => this.convertToDto(message));
    }

    public async getMessagesByUserId(userId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel.find({ userId }).exec();
        return messages.map((message) => this.convertToDto(message));
    }

    public async getMessagesSentToUserId(sentToUserId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel.find({ sentToUserId }).exec();
        return messages.map((message) => this.convertToDto(message));
    }

    public async saveMessage(saveMessageDto: SaveMessageDto): Promise<MessageDto> {
        const savedMessage = await this.messageModel.create(saveMessageDto);
        return this.convertToDto(savedMessage);
    }

    private convertToDto(message: MessageDocument): MessageDto {
        const { _id, userId, sentToUserID, content, timestamp } = message;
        return { id: _id.toString(), userId, sentToUserID, content, timestamp };
    }
}
