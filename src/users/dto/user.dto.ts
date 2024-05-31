import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsString } from 'class-validator';
import { GenderEnum } from '../../shared';
export class SaveUserDto {
    @ApiProperty()
    @IsString()
    public auth: string;

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
    public phoneNumber: string;

    @ApiPropertyOptional()
    @IsString()
    public imageLink?: string;

    @ApiProperty()
    @IsBoolean()
    public rentsRoom: boolean;

    @ApiPropertyOptional()
    @IsString()
    public room?: string;

    @ApiPropertyOptional()
    @IsArray()
    public userStayInfo?: string[];

    @ApiPropertyOptional()
    @IsArray()
    public userInfo?: string[];

    @ApiPropertyOptional()
    @IsArray()
    public userExpectations?: string[];

    @ApiPropertyOptional()
    @IsArray()
    public preferredAccommodation?: string[];
}

export class UserDto extends SaveUserDto {
    @ApiProperty()
    @IsString()
    public id: string;
}
