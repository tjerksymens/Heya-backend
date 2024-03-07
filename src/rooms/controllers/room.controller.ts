import { Controller, Get } from '@nestjs/common';
import { RoomService } from './../services/room.service';

@Controller()
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('rooms')
  getAll() {
    return this.roomService.getAll();
  }
}
