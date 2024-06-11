import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { EventEnum } from '../../shared';

export class SaveCalendar {
    @ApiProperty()
    @IsString()
    public title: string;

    @ApiPropertyOptional()
    @IsString()
    public description: string;

    @ApiProperty()
    @IsEnum(EventEnum)
    public event: EventEnum;

    @ApiProperty()
    @IsString()
    public timestamp: string;

    @ApiProperty()
    @IsString()
    public userId: string;

    @ApiProperty()
    @IsArray()
    public otherUsersId: string[];
}

export class CalendarDto extends SaveCalendar {
    @ApiProperty()
    @IsString()
    public id: string;
}
