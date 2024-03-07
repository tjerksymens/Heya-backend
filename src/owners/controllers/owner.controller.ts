import { Controller, Dependencies, Get } from '@nestjs/common';
import { OwnerService } from './../services/owner.service';

@Controller()
@Dependencies(OwnerService)
export class OwnerController {
  private ownerService: OwnerService;

  constructor(ownerService: OwnerService) { 
    this.ownerService = ownerService;
  }

  @Get('owners')
  getAll() {
    return this.ownerService.getAll();
  }
}
