import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    public readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    public readonly password: string;
}
