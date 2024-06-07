import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageDto, SaveMessageDto } from '../dto';
import { ChatService } from '../services';

@Controller('messages')
export class ChatController {
    public constructor(private chatService: ChatService) {}

    @Get('all/:userId')
    @ApiOperation({ summary: 'Get messages' })
    @ApiResponse({ status: HttpStatus.OK, type: [MessageDto] })
    public async getMessages(@Param('userId') userId: string): Promise<MessageDto[]> {
        return this.chatService.getAllMessagesForUser(userId);
    }

    @Get('all/:userId/:otherUserId')
    @ApiOperation({ summary: 'Get messages between two users' })
    @ApiResponse({ status: HttpStatus.OK, type: [MessageDto] })
    public async getMessagesBetweenUsers(
        @Param('userId') userId: string,
        @Param('otherUserId') otherUserId: string,
    ): Promise<MessageDto[]> {
        return this.chatService.getAllMessagesBetweenUsers(userId, otherUserId);
    }

    @Get('recent/:userId')
    @ApiOperation({ summary: 'Get most recent messages and load all messages with that user' })
    @ApiResponse({ status: HttpStatus.OK, type: [MessageDto] })
    public async getMostRecentMessages(@Param('userId') userId: string): Promise<MessageDto[]> {
        const mostRecentMessages = await this.chatService.getMostRecentMessages(userId);
        const otherUserId =
            mostRecentMessages[0]?.receiver?._id?.toString() || mostRecentMessages[0]?.sender?._id?.toString();
        return this.chatService.getAllMessagesBetweenUsers(userId, otherUserId);
    }

    @Post()
    @ApiOperation({ summary: 'Save message' })
    @ApiResponse({ status: HttpStatus.CREATED, type: MessageDto })
    public async saveMessage(@Body() saveMessageDto: SaveMessageDto): Promise<MessageDto> {
        return this.chatService.saveMessage(saveMessageDto);
    }
}
