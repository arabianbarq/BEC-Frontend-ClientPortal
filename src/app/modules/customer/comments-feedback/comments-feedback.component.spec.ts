import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsFeedbackComponent } from './comments-feedback.component';

describe('CommentsFeedbackComponent', () => {
  let component: CommentsFeedbackComponent;
  let fixture: ComponentFixture<CommentsFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
