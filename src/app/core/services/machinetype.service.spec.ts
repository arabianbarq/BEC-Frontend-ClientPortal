import { TestBed } from '@angular/core/testing';

import { MachinetypeService } from './machinetype.service';

describe('MachinetypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachinetypeService = TestBed.get(MachinetypeService);
    expect(service).toBeTruthy();
  });
});
