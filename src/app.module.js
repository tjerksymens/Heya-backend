import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { RoomModule } from './rooms/room.module';
import { OwnerModule } from './owners/owner.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, RoomModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
