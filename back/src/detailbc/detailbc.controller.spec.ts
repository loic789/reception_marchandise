import { Test, TestingModule } from '@nestjs/testing';
import { DetailbcController } from './detailbc.controller';
import { DetailbcService } from './detailbc.service';

describe('DetailbcController', () => {
  let controller: DetailbcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailbcController],
      providers: [DetailbcService],
    }).compile();

    controller = module.get<DetailbcController>(DetailbcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
