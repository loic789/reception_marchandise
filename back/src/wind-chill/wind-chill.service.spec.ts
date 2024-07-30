import { Test, TestingModule } from '@nestjs/testing';
import { WindChillService } from './wind-chill.service';

describe('WindChillService', () => {
  let service: WindChillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WindChillService],
    }).compile();

    service = module.get<WindChillService>(WindChillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
