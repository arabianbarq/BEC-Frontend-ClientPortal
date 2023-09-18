import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsInProgressComponent } from './jobs-in-progress.component';

describe('JobsInProgressComponent', () => {
  let component: JobsInProgressComponent;
  let fixture: ComponentFixture<JobsInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
