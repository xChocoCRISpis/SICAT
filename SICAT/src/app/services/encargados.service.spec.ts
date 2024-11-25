import { TestBed } from '@angular/core/testing';

import { EncargadosService } from './encargados.service';

describe('EncargadosService', () => {
  let service: EncargadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncargadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
