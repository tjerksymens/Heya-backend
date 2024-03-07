import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { RoomModule } from './rooms/room.module';
import { OwnerModule } from './owners/owner.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB', 'mongodb://localhost:27017'),
      }),
      inject: [ConfigService],
    }),
    UserModule, 
    RoomModule, 
    OwnerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
