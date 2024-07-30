import { Test, TestingModule } from '@nestjs/testing';
import { BcController } from './bc.controller';
import { BcService } from './bc.service';

describe('BcController', () => {
  let controller: BcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BcController],
      providers: [BcService],
    }).compile();

    controller = module.get<BcController>(BcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
