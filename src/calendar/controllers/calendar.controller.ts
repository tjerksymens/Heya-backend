import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { CalendarService } from '../services/calendar.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CalendarDto, SaveCalendar } from '../dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
    public constructor(private calendarService: CalendarService) {}

    @Get('/:userId')
    @ApiOperation({ summary: 'Get Calendar' })
    @ApiResponse({ status: HttpStatus.OK, type: [CalendarDto] })
    public async getCalendar(@Param('userId') userId: string): Promise<CalendarDto[]> {
        return this.calendarService.getCalendar(userId);
    }

    @Post()
    @ApiOperation({ summary: 'Save Calendar' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CalendarDto })
    public async saveCalendar(@Body() saveCalendar: SaveCalendar): Promise<CalendarDto> {
        return this.calendarService.saveCalendar(saveCalendar);
    }
}
