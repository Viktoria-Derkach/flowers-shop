import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('FlowersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('flowers get', () => {
    return request(app.getHttpServer()).get('/flowers').expect(200);
    // .expect([
    //   {
    //     id: 1,
    //     name: 'rose',
    //     color: 'red',
    //     price: 10,
    //   },
    // ]);
  });

  // it('flowers post', () => {
  //   return request(app.getHttpServer())
  //     .post('/flowers')
  //     .send({
  //       name: 'rose',
  //       color: 'red',
  //       price: 10,
  //     })
  //     .expect(201)
  //     .expect((res) => [
  //       {
  //         id: 1,
  //         name: 'rose',
  //         color: 'red',
  //         price: 10,
  //       },
  //     ]);
  // });

  afterAll(async () => {
    await app.close();
  });
});
