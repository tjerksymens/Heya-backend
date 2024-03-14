import { Body, Controller, HttpCode, HttpStatus, Get, Post, Put, Delete, Param } from '@nestjs/common';
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
    public async updateCost(@Param('id') id: string, @Body() cost: UserDto) {
        return this.userService.updateUser(id, cost);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully deleted' })
    public async deleteCost(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
