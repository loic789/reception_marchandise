import { Test, TestingModule } from '@nestjs/testing';
import { MultisitService } from './multisit.service';

describe('MultisitService', () => {
  let service: MultisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultisitService],
    }).compile();

    service = module.get<MultisitService>(MultisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
