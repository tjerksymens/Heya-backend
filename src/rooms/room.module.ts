import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './schema';
import { RoomService } from './services';
import { RoomController } from './controllers';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService],
})
export class RoomModule {}
