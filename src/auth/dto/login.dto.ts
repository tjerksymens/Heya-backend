import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    public readonly password: string;
}
