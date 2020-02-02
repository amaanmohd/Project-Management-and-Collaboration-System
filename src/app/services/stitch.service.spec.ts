import { TestBed } from '@angular/core/testing';

import { StitchService } from './stitch.service';

describe('StitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StitchService = TestBed.get(StitchService);
    expect(service).toBeTruthy();
  });
});
