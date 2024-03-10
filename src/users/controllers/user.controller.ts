import { Body, Controller, Dependencies, Get, Post } from '@nestjs/common';
import { UserService } from '../services';
import { UserDto } from '../dto';

@Controller('users')
@Dependencies(UserService)
export class UserController {
  private userService: UserService; 

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Post()
  createUser(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }
}
