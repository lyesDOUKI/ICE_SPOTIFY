import { TestBed } from '@angular/core/testing';

import { SpotifyCommService } from './spotify-comm.service';

describe('SprotifyCommService', () => {
  let service: SpotifyCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
