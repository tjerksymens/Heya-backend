import { Body, Controller, HttpCode, HttpStatus, Get, Post, Put, Delete, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomDto } from '../dto';
import { RoomService } from '../services';

@Controller('rooms')
export class RoomController {
    public constructor(private roomService: RoomService) {}

    @Get()
    @ApiOperation({ summary: 'Get all rooms' })
    @ApiResponse({ status: HttpStatus.OK, type: [RoomDto] })
    public getAllRooms(@Query('city') city: string, @Query('keywords') keywords: string) {
        const filters = {
            city,
            keywords: keywords ? keywords.split(',') : [],
        };
        return this.roomService.getAllRooms(filters);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get room by id' })
    @ApiResponse({ status: HttpStatus.OK, type: RoomDto })
    public getRoomById(@Param('id') id: string) {
        return this.roomService.getRoom(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a room' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The room has been successfully created' })
    public async createRoom(@Body() roomDto: RoomDto) {
        return this.roomService.createRoom(roomDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a room' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The room has been successfully updated' })
    public async updateRoom(@Param('id') id: string, @Body() cost: RoomDto) {
        return this.roomService.updateRoom(id, cost);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a room' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The room has been successfully updated' })
    public async updateRoomPart(@Param('id') id: string, @Body() cost: RoomDto) {
        return this.roomService.updateRoomPart(id, cost);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a room' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The room has been successfully deleted' })
    public async deleteCost(@Param('id') id: string) {
        return this.roomService.deleteRoom(id);
    }
}
