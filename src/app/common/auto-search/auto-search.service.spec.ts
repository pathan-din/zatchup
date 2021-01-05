import { TestBed } from '@angular/core/testing';

import { AutoSearchService } from './auto-search.service';

describe('AutoSearchService', () => {
  let service: AutoSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
