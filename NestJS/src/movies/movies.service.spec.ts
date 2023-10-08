import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(()=>{
    //테스트 끝난후에 실행, 테스트 DB를 모두 지우는 함수같은거 넣으면 좋음
    //이거 외에도 beforeAll(), afterEach()도 있음
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{
    it("should return an array", ()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", ()=>{
    it("should return a movie", ()=>{
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test']
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", ()=>{
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe("deleteOne", ()=>{
    it("deletes a movie", ()=>{
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test']
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it("should return 404 error", ()=>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", ()=>{
    it("should create a movie", ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test']
      });
      const afterCreate = service.getAll().length;
      // console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", ()=>{
    it("should update a movie", ()=>{
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test']
      });
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it("should throw a NotFoundException", ()=>{
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
