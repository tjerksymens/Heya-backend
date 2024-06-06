import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageDto, SaveMessageDto } from '../dto';
import { ChatService } from '../services';

@Controller('messages')
export class ChatController {
    public constructor(private chatService: ChatService) {}

    @Get()
    @ApiOperation({ summary: 'Get messages' })
    @ApiResponse({ status: HttpStatus.OK, type: [MessageDto] })
    public async getMessages(): Promise<MessageDto[]> {
        return this.chatService.getMessages();
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get messages by user id' })
    @ApiResponse({ status: HttpStatus.OK, type: [MessageDto] })
    public async getMessagesByUserId(@Param('userId') userId: string): Promise<MessageDto[]> {
        return this.chatService.getMessagesByUserId(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Save message' })
    @ApiResponse({ status: HttpStatus.CREATED, type: MessageDto })
    public async saveMessage(@Body() saveMessageDto: SaveMessageDto): Promise<MessageDto> {
        return this.chatService.saveMessage(saveMessageDto);
    }
}
