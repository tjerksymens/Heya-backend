import { Injectable } from '@nestjs/common';
import { Calendar } from '../schema/calendar.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CalendarDto, SaveCalendar } from '../dto/calendar.dto';

@Injectable()
export class CalendarService {
    public constructor(@InjectModel(Calendar.name) private calendarModel: Model<Calendar>) {}

    public async getCalendar(userId: string): Promise<CalendarDto[]> {
        const calendars = await this.calendarModel
            .find({
                $or: [{ userId: userId }, { otherUsersId: userId }],
            })
            .exec();
        return calendars.map((calendar) => this.toCalendarDto(calendar));
    }

    public async saveCalendar(saveCalendar: SaveCalendar): Promise<CalendarDto> {
        const createdCalendar = new this.calendarModel(saveCalendar);
        const savedCalendar = await createdCalendar.save();
        return this.toCalendarDto(savedCalendar);
    }

    private toCalendarDto(calendar: Calendar): CalendarDto {
        return {
            id: calendar._id.toString(),
            title: calendar.title,
            description: calendar.description,
            event: calendar.event,
            timestamp: calendar.timestamp.toString(),
            userId: calendar.userId.toString(),
            otherUsersId: calendar.otherUsersId.map((id) => id.toString()),
        };
    }
}
