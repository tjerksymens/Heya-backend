import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class RoomDto {
    @ApiProperty()
    @IsString()
    public title: string;

    @ApiProperty()
    @IsArray()
    public members: string[];
}
