import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { GenderEnum } from '../../shared';
export class OwnerDto {
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
    public owner: string;
}
