import { TestBed } from '@angular/core/testing';

import { EiServiceService } from './ei-service.service';

describe('EiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EiServiceService = TestBed.get(EiServiceService);
    expect(service).toBeTruthy();
  });
});
