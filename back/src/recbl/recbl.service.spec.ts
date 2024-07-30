import { Test, TestingModule } from '@nestjs/testing';
import { RecblService } from './recbl.service';

describe('RecblService', () => {
  let service: RecblService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecblService],
    }).compile();

    service = module.get<RecblService>(RecblService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
