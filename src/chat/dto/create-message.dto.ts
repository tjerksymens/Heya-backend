import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../../users/schema'; // Import the User DTO if not imported already

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
    @IsString()
    public timestamp: string;
}

export class MessageDto extends SaveMessageDto {
    @ApiProperty()
    @IsString()
    public id: string;

    @ApiProperty()
    public sender: User;

    @ApiProperty()
    public receiver: User;
}
