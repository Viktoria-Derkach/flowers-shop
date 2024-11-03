import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FlowersService {
  constructor(private readonly prismaService: PrismaService) {}
  findAll() {
    return this.prismaService.flower.findMany();
    // return [{ name: 'red', color: 'red', price: 1 }];
  }
}
