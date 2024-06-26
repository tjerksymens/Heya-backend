import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class RoomDto {
    @ApiProperty()
    @IsString()
    public owner: string;

    @ApiProperty()
    @IsString()
    public type: string;

    @ApiProperty()
    @IsString()
    public streetName: string;

    @ApiProperty()
    @IsNumber()
    public houseNumber: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public bus: string;

    @ApiProperty()
    @IsString()
    public city: string;

    @ApiProperty()
    @IsString()
    public postalCode: string;

    @ApiProperty()
    @IsString()
    public place: string;

    @ApiProperty()
    @IsString()
    public country: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public description: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public householdDetails: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public propertyDetails: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public sharedSpaces: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public roomDetails: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public personalRoomDetails: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public uniqueAboutPlace: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public images: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public members: string[];

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public startDateAvailable: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public endDateAvailable: string;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public pricing: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public idealAttendant: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public privacy: string[];

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public meeting: string;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    public spotlight: boolean;

    public constructor(partial: Partial<RoomDto>) {
        Object.assign(this, partial);
    }
}
