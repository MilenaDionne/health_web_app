import { TestBed } from '@angular/core/testing';

import { DivisionFacadeService } from './division-facade.service';

describe('DivisionFacadeService', () => {
  let service: DivisionFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
