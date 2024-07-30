import { Test, TestingModule } from '@nestjs/testing';
import { WindChillController } from './wind-chill.controller';
import { WindChillService } from './wind-chill.service';

describe('WindChillController', () => {
  let controller: WindChillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WindChillController],
      providers: [WindChillService],
    }).compile();

    controller = module.get<WindChillController>(WindChillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
