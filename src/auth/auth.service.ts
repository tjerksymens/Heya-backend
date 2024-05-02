import { Injectable, UnauthorizedException } from '@nestjs/common';
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.authModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    public async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.authModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }
}
