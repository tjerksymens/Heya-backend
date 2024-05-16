import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    public constructor(
        @InjectModel(Auth.name)
        private authModel: Model<Auth>,
        private jwtService: JwtService,
    ) {}

    public async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;

        if (!this.isPasswordValid(password)) {
            throw new BadRequestException('Password does not meet complexity requirements');
        }

        if (!this.isEmailValid(email)) {
            throw new BadRequestException('Invalid email address');
        }

        const existingUser = await this.authModel.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 13);

        const user = await this.authModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    private isPasswordValid(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        return passwordRegex.test(password);
    }

    private isEmailValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.authModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Email does not exist');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is incorrect');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }
}
