import { TestBed } from '@angular/core/testing';

import { AsrService } from './asr.service';

describe('AsrService', () => {
  let service: AsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
