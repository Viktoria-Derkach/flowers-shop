import { Injectable } from '@nestjs/common';

@Injectable()
export class FlowersService {
  findAll() {
    return [{ name: 'red', color: 'red', price: 1 }];
  }
}
