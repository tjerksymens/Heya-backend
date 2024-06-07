import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schema';
import { MessageDto, SaveMessageDto } from '../dto';
import { UserService } from '../../users/services';

@Injectable()
export class ChatService {
    public constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        public userService: UserService,
    ) {}

    private async mapMessagesToMessageDtos(messages: Message[]): Promise<MessageDto[]> {
        return await Promise.all(
            messages.map(async (message) => {
                const senderId = message.userId.toString();
                const receiverId = message.sentToUserId.toString();
                const [sender, receiver] = await Promise.all([
                    this.userService.getUser(senderId),
                    this.userService.getUser(receiverId),
                ]);
                const messageDto: MessageDto = {
                    id: message._id.toString(),
                    userId: message.userId,
                    sentToUserId: message.sentToUserId,
                    content: message.content,
                    timestamp: message.timestamp,
                    sender,
                    receiver,
                };
                return messageDto;
            }),
        );
    }

    public async getAllMessagesForUser(userId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel
            .find({ $or: [{ userId }, { sentToUserId: userId }] })
            .sort({ timestamp: -1 })
            .exec();

        return this.mapMessagesToMessageDtos(messages);
    }

    public async getAllMessagesBetweenUsers(userId: string, otherUserId: string): Promise<MessageDto[]> {
        const messages = await this.messageModel
            .find({
                $or: [
                    { userId, sentToUserId: otherUserId },
                    { userId: otherUserId, sentToUserId: userId },
                ],
            })
            .sort({ timestamp: -1 })
            .exec();

        return this.mapMessagesToMessageDtos(messages);
    }

    public async getMostRecentMessages(userId: string): Promise<MessageDto[]> {
        const mostRecentMessages = await this.messageModel
            .find({ $or: [{ userId }, { sentToUserId: userId }] })
            .sort({ timestamp: -1 })
            .limit(1)
            .exec();

        return this.mapMessagesToMessageDtos(mostRecentMessages);
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
