import { Module } from '@nestjs/common';
import { OwnerController } from './controllers';
import { OwnerService } from './services';

@Module({
    imports: [],
    controllers: [OwnerController],
    providers: [OwnerService],
})
export class OwnerModule {}
