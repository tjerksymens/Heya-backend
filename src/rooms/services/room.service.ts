import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  getAll() {
    return 'All rooms!';
  }

  createRoom(){
    return 'Room created!';
  }
}
