import { Module } from '@nestjs/common';
import { Calendar, CalendarSchema } from './schema/calendar.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarController } from './controllers/calendar.controller';
import { CalendarService } from './services/calendar.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Calendar.name, schema: CalendarSchema }])],
    controllers: [CalendarController],
    providers: [CalendarService, CalendarController],
    exports: [CalendarService, CalendarController],
})
export class CalendarModule {}
