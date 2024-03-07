import { Controller, Dependencies, Get } from '@nestjs/common';
import { UserService } from './../services/user.service';

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
}
