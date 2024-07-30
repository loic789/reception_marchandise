import { Test, TestingModule } from '@nestjs/testing';
import { MultisitController } from './multisit.controller';
import { MultisitService } from './multisit.service';

describe('MultisitController', () => {
  let controller: MultisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultisitController],
      providers: [MultisitService],
    }).compile();

    controller = module.get<MultisitController>(MultisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
