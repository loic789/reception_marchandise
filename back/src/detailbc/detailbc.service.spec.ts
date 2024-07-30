import { Test, TestingModule } from '@nestjs/testing';
import { DetailbcService } from './detailbc.service';

describe('DetailbcService', () => {
  let service: DetailbcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailbcService],
    }).compile();

    service = module.get<DetailbcService>(DetailbcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
