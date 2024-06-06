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
                const sender = await this.userService.getUser(message.userId);
                const receiver = await this.userService.getUser(message.sentToUserId);
                return { ...message.toObject(), sender, receiver };
            }),
        );
    }

    public async getMessagesByUserId(userId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel
            .find({
                $or: [{ userId }, { sentToUserId: userId }],
            })
            .exec();

        return Promise.all(
            messages.map(async (message) => {
                const sender = await this.userService.getUser(message.userId);
                const receiver = await this.userService.getUser(message.sentToUserId);
                return { ...message.toObject(), sender, receiver };
            }),
        );
    }

    public async getMessagesSentToUserId(sentToUserId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel.find({ sentToUserId }).exec();
        return Promise.all(
            messages.map(async (message) => {
                const sender = await this.userService.getUser(message.userId);
                const receiver = await this.userService.getUser(message.sentToUserId);
                return { ...message.toObject(), sender, receiver };
            }),
        );
    }

    public async saveMessage(saveMessageDto: SaveMessageDto): Promise<MessageDto> {
        const { userId, sentToUserId } = saveMessageDto;

        const [sender, receiver] = await Promise.all([
            this.userService.getUser(userId),
            this.userService.getUser(sentToUserId),
        ]);

        const message = await this.messageModel.create({
            ...saveMessageDto,
            sender,
            receiver,
        });

        return message.toObject();
    }
}
