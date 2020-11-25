import { TestBed } from '@angular/core/testing';

import { GenericFormValidationService } from './generic-form-validation.service';

describe('GenericFormValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericFormValidationService = TestBed.get(GenericFormValidationService);
    expect(service).toBeTruthy();
  });
});
