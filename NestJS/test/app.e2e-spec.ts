import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {//매번 어플을 새로 만들지 않기 위해 beforeEach대신 beforeAll
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({//테스트할 때 실제 서비스 환경과 같게 만들어 줘야 함
      whitelist: true,//dto 검증
      forbidNonWhitelisted: true,//잘못된 값 보내면 막아줌
      transform: true,//class-transformer로 서버로 데이터가 넘어올 때 자동으로 형변환 해줌
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())//request는 supertest에서 가져온것
      .get('/')
      .expect(200)
      .expect('Wellcom app controller API Home');
  });

  describe('/movies', ()=>{
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'e2e Test Movie',
          year: 2000,
          genres: ['e2e test']
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'e2e Test Movie',
          year: 2000,
          genres: ['e2e test'],
          other: 'thing'
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });

  describe('/movies/:id', ()=>{
    it('GET 200', ()=>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });
    it('GET 404', ()=>{
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });
    it.todo('GET');
    it('PATCH 200', ()=>{
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title: 'Patch TEST'})
      .expect(200);
    });
    it('DELETE 200', ()=>{
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  });
});
