import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerController } from './controllers';
import { OwnerService } from './services';
import { OwnerSchema } from './schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Owner', schema: OwnerSchema }])],
    controllers: [OwnerController],
    providers: [OwnerService],
    exports: [OwnerService],
})
export class OwnerModule {}
