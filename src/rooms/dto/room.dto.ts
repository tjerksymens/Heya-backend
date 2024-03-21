import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoomDto {
    @ApiProperty()
    @IsString()
    public title: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public description: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public extraInfo: string;

    @ApiProperty()
    @IsBoolean()
    public furnished: boolean;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    public houseSize: number;

    @ApiProperty()
    @IsNumber()
    public amountOfRooms: number;

    @ApiProperty()
    @IsNumber()
    public PeopleLivingHere: number;

    @ApiProperty()
    @IsBoolean()
    public areTherePets: boolean;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    public kindOfPets: string;

    @ApiProperty()
    @IsString()
    public imageLink: string;

    @ApiProperty()
    @IsDateString()
    public startDateAvailability: string;

    @ApiProperty()
    @IsDateString()
    public endDateAvailability: string;

    @ApiProperty()
    @IsNumber()
    public rentPrice: number;

    @ApiProperty()
    @IsNumber()
    public additionalCost: number;

    @ApiProperty()
    @IsNumber()
    public serviceCost: number;

    @ApiProperty()
    @IsNumber()
    public deposit: number;

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public idealAttendantInfo: string[];

    @ApiPropertyOptional()
    @IsArray()
    @IsOptional()
    public privacyInfo: string[];

    @ApiProperty()
    @IsArray()
    public members: string[];

    @ApiProperty()
    @IsString()
    public owner: string;
}
