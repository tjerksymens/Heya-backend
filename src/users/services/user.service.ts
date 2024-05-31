import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto';
import { User } from '../schema';

@Injectable()
export class UserService {
    public constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    public async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    public async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return user;
    }

    public async getUserByAuth(auth: string): Promise<User> {
        const user = await this.userModel.findOne({ auth }).exec();
        if (!user) {
            throw new NotFoundException(`User with auth ${auth} not found.`);
        }
        return user;
    }

    public async createUser(userData: UserDto): Promise<UserDto> {
        const existingUser = await this.userModel.findOne({ auth: userData.auth }).exec();

        if (existingUser) {
            return this.updateUser(existingUser.id, userData);
        } else {
            const newUser = new this.userModel(userData);
            const createdUser = await newUser.save();
            return createdUser.toObject();
        }
    }

    public async updateUser(id: string, userData: UserDto): Promise<UserDto> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return updatedUser.toObject();
    }

    public async patchUser(id: string, userData: Partial<UserDto>): Promise<UserDto> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: userData }, { new: true }).exec();
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return updatedUser.toObject();
    }

    public async deleteUser(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
    }
}
