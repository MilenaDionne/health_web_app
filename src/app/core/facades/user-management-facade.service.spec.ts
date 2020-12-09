import { TestBed } from '@angular/core/testing';

import { UserManagementFacadeService } from './user-management-facade.service';

describe('UserManagementFacadeService', () => {
  let service: UserManagementFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
