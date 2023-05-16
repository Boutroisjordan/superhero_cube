import { Test, TestingModule } from '@nestjs/testing';
import { DeclarationsController } from './declarations.controller';

describe('DeclarationsController', () => {
  let controller: DeclarationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeclarationsController],
    }).compile();

    controller = module.get<DeclarationsController>(DeclarationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
