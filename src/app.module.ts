import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './rooms/room.module';
import { OwnerModule } from './owners/owner.module';
import { UserModule } from './users/user.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/Heya'),
            }),
            inject: [ConfigService],
        }),
        RoomModule,
        OwnerModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
