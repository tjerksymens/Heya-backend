import { Controller, Dependencies, Get } from '@nestjs/common';
import { RoomService } from './../services/room.service';

@Controller()
@Dependencies(RoomService)
export class RoomController {
  constructor(roomService) {
    this.roomService = roomService;
  }

  @Get('rooms')
  getAll() {
    return this.roomService.getAll();
  }
}
