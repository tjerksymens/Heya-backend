import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './rooms/room.module';
import { OwnerModule } from './owners/owner.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadController } from './cloudinary/cloudinary.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ChatModule } from './chat/chat.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB', 'mongodb://localhost:27017/Heya'),
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        RoomModule,
        OwnerModule,
        UserModule,
        ChatModule,
        CalendarModule,
        MulterModule.register({
            storage: memoryStorage(),
        }),
    ],
    controllers: [UploadController],
    providers: [CloudinaryService],
})
export class AppModule {}
