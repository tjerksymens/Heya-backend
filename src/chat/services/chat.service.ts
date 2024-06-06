import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schema';
import { MessageDto, SaveMessageDto } from '../dto';
import { UserService } from '../../users/services';

@Injectable()
export class ChatService {
    public constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        public userService: UserService,
    ) {}

    public async getMessages(): Promise<MessageDto[]> {
        const messages = await this.messageModel.find().exec();
        return Promise.all(
            messages.map(async (message) => {
                const userId = message.userId.toString();
                const user = await this.userService.getUser(userId);
                return { ...message.toObject(), user };
            }),
        );
    }

    public async getMessagesByUserId(userId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel.find({ userId }).exec();
        return Promise.all(
            messages.map(async (message) => {
                const user = await this.userService.getUser(userId);
                return { ...message.toObject(), user };
            }),
        );
    }

    public async getMessagesSentToUserId(sentToUserId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel.find({ sentToUserId }).exec();
        return Promise.all(
            messages.map(async (message) => {
                const user = await this.userService.getUser(sentToUserId);
                return { ...message.toObject(), user };
            }),
        );
    }

    public async saveMessage(saveMessageDto: SaveMessageDto): Promise<MessageDto> {
        const message = await this.messageModel.create(saveMessageDto);
        return message.toObject();
    }
}
