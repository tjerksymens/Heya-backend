import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.shema';

interface UserData {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  getAll() {
    return 'All users!';
  }

  async createUser(userData: UserData) {
    const user = new User(userData);
    return await user.save();
  }
}
