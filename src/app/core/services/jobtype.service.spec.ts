import { TestBed } from '@angular/core/testing';

import { JobtypeService } from './jobtype.service';

describe('JobtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobtypeService = TestBed.get(JobtypeService);
    expect(service).toBeTruthy();
  });
});
