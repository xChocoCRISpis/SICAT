import { TestBed } from '@angular/core/testing';

import { MessengerStatesService } from './messenger-states.service';

describe('MessengerStatesService', () => {
  let service: MessengerStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessengerStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
