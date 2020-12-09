import { TestBed } from '@angular/core/testing';

import { DoctorUserGuard } from './doctor-user.guard';

describe('DoctorUserGuard', () => {
  let guard: DoctorUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DoctorUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
