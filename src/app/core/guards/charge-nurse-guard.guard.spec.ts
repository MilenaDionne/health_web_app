import { TestBed } from '@angular/core/testing';

import { ChargeNurseGuardGuard } from './charge-nurse-guard.guard';

describe('ChargeNurseGuardGuard', () => {
  let guard: ChargeNurseGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChargeNurseGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
