import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto';
import { User } from '../schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll() {
    return 'All Users';
  }

  async createUser(userData: UserDto) {
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }
}
