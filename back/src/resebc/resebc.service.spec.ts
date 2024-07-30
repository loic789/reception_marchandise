import { Test, TestingModule } from '@nestjs/testing';
import { ResebcService } from './resebc.service';

describe('ResebcService', () => {
  let service: ResebcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResebcService],
    }).compile();

    service = module.get<ResebcService>(ResebcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
