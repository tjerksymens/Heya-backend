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

    public async getAllMessagesForUser(userId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel
            .find({ $or: [{ userId }, { sentToUserId: userId }] })
            .sort({ timestamp: -1 })
            .exec();

        return Promise.all(
            messages.map(async (message) => {
                const senderId = message.userId.toString();
                const receiverId = message.sentToUserId.toString();
                const [sender, receiver] = await Promise.all([
                    this.userService.getUser(senderId),
                    this.userService.getUser(receiverId),
                ]);
                const timestamp = new Date(message.timestamp);
                const formattedTimestamp = this.formatTimestamp(timestamp);
                const messageDto: MessageDto = {
                    id: message._id.toString(),
                    userId: message.userId,
                    sentToUserId: message.sentToUserId,
                    content: message.content,
                    timestamp: formattedTimestamp,
                    sender,
                    receiver,
                };
                return messageDto;
            }),
        );
    }

    private formatTimestamp(timestamp: Date): string {
        const now = new Date();
        if (timestamp.toDateString() === now.toDateString()) {
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes().toString().padStart(2, '0');
            return `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        } else {
            const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
            return timestamp.toLocaleDateString(undefined, options);
        }
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
