import { Body, Controller, HttpCode, HttpStatus, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OwnerDto } from '../dto';
import { OwnerService } from '../services';

@Controller('owners')
export class OwnerController {
    public constructor(private ownerService: OwnerService) {}

    @Get()
    @ApiOperation({ summary: 'Get all owners' })
    @ApiResponse({ status: HttpStatus.OK, type: [OwnerDto] })
    public getAllOwners() {
        return this.ownerService.getAllOwners();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get owner by id' })
    @ApiResponse({ status: HttpStatus.OK, type: OwnerDto })
    public getOwnerById(@Param('id') id: string) {
        return this.ownerService.getOwner(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a owner' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The owner has been successfully created' })
    public async createOwner(@Body() ownerDto: OwnerDto) {
        return this.ownerService.createOwner(ownerDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a owner' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The owner has been successfully updated' })
    public async updateOwner(@Param('id') id: string, @Body() owner: OwnerDto) {
        return this.ownerService.updateOwner(id, owner);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a owner' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The owner has been successfully deleted' })
    public async deleteOwner(@Param('id') id: string) {
        return this.ownerService.deleteOwner(id);
    }
}
