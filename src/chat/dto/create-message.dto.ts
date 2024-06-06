import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class SaveMessageDto {
    @ApiProperty()
    @IsString()
    public userId: string;

    @ApiProperty()
    @IsString()
    public sentToUserId: string;

    @ApiProperty()
    @IsString()
    public content: string;

    @ApiProperty()
    @IsDateString()
    public timestamp: Date;
}

export class MessageDto extends SaveMessageDto {
    @ApiProperty()
    @IsString()
    public id: string;
}
