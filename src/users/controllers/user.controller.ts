import { Body, Controller, HttpCode, HttpStatus, Get, Post, Put, Delete, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '../dto';
import { UserService } from '../services';

@Controller('users')
export class UserController {
    public constructor(private userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, type: [UserDto] })
    public getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    public getUserById(@Param('id') id: string) {
        return this.userService.getUser(id);
    }

    @Get('auth/:auth')
    @ApiOperation({ summary: 'Get user by auth' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    public getUserByAuth(@Param('auth') auth: string) {
        return this.userService.getUserByAuth(auth);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created' })
    public async createUser(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully updated' })
    public async updateUser(@Param('id') id: string, @Body() user: UserDto) {
        return this.userService.updateUser(id, user);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Partially update a user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully updated' })
    public async patchUser(@Param('id') id: string, @Body() user: Partial<UserDto>) {
        return this.userService.patchUser(id, user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully deleted' })
    public async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
