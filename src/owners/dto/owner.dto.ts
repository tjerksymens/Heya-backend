import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class OwnerDto {
    @ApiProperty()
    @IsString()
    public name: string;

    @ApiProperty()
    @IsString()
    public email: string;
}
