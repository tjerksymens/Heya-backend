import { Body, Controller, Dependencies, Get, Post } from '@nestjs/common';
import { UserService } from '../services';
import { UserDto } from '../dto/user.dto';

@Controller()
@Dependencies(UserService)
export class UserController {
  private userService: UserService; 

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get('users')
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  createUser(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }
}
