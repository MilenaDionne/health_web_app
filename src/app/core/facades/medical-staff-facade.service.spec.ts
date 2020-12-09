import { TestBed } from '@angular/core/testing';

import { MedicalStaffFacadeService } from './medical-staff-facade.service';

describe('MedicalStaffFacadeService', () => {
  let service: MedicalStaffFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalStaffFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
