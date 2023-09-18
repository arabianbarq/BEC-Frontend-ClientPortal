import { TestBed } from '@angular/core/testing';

import { JobdetailReportService } from './jobdetail-report.service';

describe('JobdetailReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobdetailReportService = TestBed.get(JobdetailReportService);
    expect(service).toBeTruthy();
  });
});
