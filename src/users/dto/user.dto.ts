import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsString } from 'class-validator';
import { GenderEnum } from '../../shared';
export class UserDto {
    @ApiProperty()
    @IsString()
    public firstName: string;

    @ApiProperty()
    @IsString()
    public lastName: string;

    @ApiProperty()
    @IsEnum(GenderEnum)
    public type: GenderEnum;

    @ApiProperty()
    @IsDateString()
    public birthday: string;

    @ApiProperty()
    @IsString()
    public email: string;

    @ApiProperty()
    @IsString()
    public password: string;

    @ApiProperty()
    @IsString()
    public phoneNumber: string;

    @ApiProperty()
    @IsString()
    public imageLink: string;

    @ApiProperty()
    @IsBoolean()
    public rentsRoom: boolean;

    @ApiProperty()
    @IsString()
    public room: string;

    @ApiProperty()
    @IsArray()
    public userStayInfo: string[];

    @ApiProperty()
    @IsArray()
    public userInfo: string[];

    @ApiProperty()
    @IsArray()
    public userExpectations: string[];
}
