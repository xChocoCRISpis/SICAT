import { Test, TestingModule } from '@nestjs/testing';
import { ChecadorService } from './checador.service';

describe('ChecadorService', () => {
  let service: ChecadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecadorService],
    }).compile();

    service = module.get<ChecadorService>(ChecadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
