import { TestBed } from '@angular/core/testing';

import { CookGuard } from './cook.guard';

describe('CookGuard', () => {
  let guard: CookGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CookGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
