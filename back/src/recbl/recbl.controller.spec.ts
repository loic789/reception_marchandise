import { Test, TestingModule } from '@nestjs/testing';
import { RecblController } from './recbl.controller';
import { RecblService } from './recbl.service';

describe('RecblController', () => {
  let controller: RecblController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecblController],
      providers: [RecblService],
    }).compile();

    controller = module.get<RecblController>(RecblController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
