import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateFlowersDto } from './flowers.dto';
import { ConfigService } from '@nestjs/config';
import { EnumAppMode } from '../types';

@Injectable()
export class FlowersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  findAll() {
    console.log(this.configService.get<EnumAppMode>('MODE'));

    return this.prismaService.flower.findMany();
    // return [{ name: 'red', color: 'red', price: 1 }];
  }

  create(dto: CreateFlowersDto) {
    return this.prismaService.flower.create({
      data: dto,
    });
  }
}
