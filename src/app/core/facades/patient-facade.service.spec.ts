import { TestBed } from '@angular/core/testing';

import { PatientFacadeService } from './patient-facade.service';

describe('PatientFacadeService', () => {
  let service: PatientFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
