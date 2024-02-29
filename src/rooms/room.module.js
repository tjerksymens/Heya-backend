import { Module } from '@nestjs/common';
import { RoomController } from './controllers';
import { RoomService } from './services';

@Module({
    imports: [],
    controllers: [RoomController],
    providers: [RoomService],
})
export class RoomModule {}
