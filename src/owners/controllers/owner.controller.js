import { Controller, Dependencies, Get } from '@nestjs/common';
import { OwnerService } from './../services/owner.service';

@Controller()
@Dependencies(OwnerService)
export class OwnerController {
  constructor(ownerService) {
    this.ownerService = ownerService;
  }

  @Get('owners')
  getAll() {
    return this.ownerService.getAll();
  }
}
