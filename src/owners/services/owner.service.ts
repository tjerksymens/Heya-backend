import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnerService {
  getAll() {
    return 'All owners!';
  }
}
