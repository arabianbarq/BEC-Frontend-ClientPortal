import { TestBed } from '@angular/core/testing';

import { GlobalcodeService } from './globalcode.service';

describe('GlobalcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalcodeService = TestBed.get(GlobalcodeService);
    expect(service).toBeTruthy();
  });
});
