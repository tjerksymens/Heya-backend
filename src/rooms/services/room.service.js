import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  getAll() {
    return 'All rooms!';
  }
}
