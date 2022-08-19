import { TestBed } from '@angular/core/testing';

import { masterGuard } from './master.guard';

describe('masterGuard', () => {
  let guard: masterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(masterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
