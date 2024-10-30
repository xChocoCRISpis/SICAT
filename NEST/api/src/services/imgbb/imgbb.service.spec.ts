import { Test, TestingModule } from '@nestjs/testing';
import { ImgbbService } from './imgbb.service';

describe('ImgbbService', () => {
  let service: ImgbbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgbbService],
    }).compile();

    service = module.get<ImgbbService>(ImgbbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
