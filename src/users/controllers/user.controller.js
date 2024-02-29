import { Controller, Dependencies, Get } from '@nestjs/common';
import { UserService } from './../services/user.service';

@Controller()
@Dependencies(UserService)
export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  @Get('users')
  getAll() {
    return this.userService.getAll();
  }
}
