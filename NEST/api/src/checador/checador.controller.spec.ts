import { Test, TestingModule } from '@nestjs/testing';
import { ChecadorController } from './checador.controller';
import { ChecadorService } from './checador.service';

describe('ChecadorController', () => {
  let controller: ChecadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecadorController],
      providers: [ChecadorService],
    }).compile();

    controller = module.get<ChecadorController>(ChecadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
