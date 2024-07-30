import { Test, TestingModule } from '@nestjs/testing';
import { ResebcController } from './resebc.controller';
import { ResebcService } from './resebc.service';

describe('ResebcController', () => {
  let controller: ResebcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResebcController],
      providers: [ResebcService],
    }).compile();

    controller = module.get<ResebcController>(ResebcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
