import { Test } from '@nestjs/testing';
import { FlowersController } from './flowers.controller';
import { FlowersService } from './flowers.service';
import { ConfigService } from '@nestjs/config';

describe('FlowersController', () => {
  let controller: FlowersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FlowersController],
      providers: [
        {
          provide: FlowersService,
          useValue: {
            findAll: jest.fn().mockReturnValue([
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

        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FlowersController>(FlowersController);
  });

  it('should return an array of flowers', async () => {
    expect(await controller.findAll(1)).toEqual([
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
      await controller.create({
        name: 'rose',
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
