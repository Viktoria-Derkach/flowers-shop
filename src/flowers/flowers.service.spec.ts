import { Test } from '@nestjs/testing';
import { FlowersService } from './flowers.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

describe('FlowersService', () => {
  let service: FlowersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FlowersService,
        {
          provide: PrismaService,
          useValue: {
            flower: {
              findMany: jest.fn().mockReturnValue([
                {
                  id: 1,
                  name: 'rose',
                  color: 'red',
                  price: 10,
                },
              ]),
              create: jest.fn().mockReturnValue({
                id: 2,
                name: 'lily',
                color: 'red',
                price: 10,
              }),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FlowersService>(FlowersService);
  });

  it('should return an array of flowers', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: 1,
        name: 'rose',
        color: 'red',
        price: 10,
      },
    ]);
  });

  it('should create a new flowers', async () => {
    expect(
      await service.create({
        name: 'lily',
        color: 'red',
        price: 10,
      }),
    ).toEqual({
      id: 2,
      name: 'lily',
      color: 'red',
      price: 10,
    });
  });
});
