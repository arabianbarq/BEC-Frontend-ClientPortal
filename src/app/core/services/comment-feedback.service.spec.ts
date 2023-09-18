import { TestBed } from '@angular/core/testing';

import { CommentFeedbackService } from './comment-feedback.service';

describe('CommentFeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentFeedbackService = TestBed.get(CommentFeedbackService);
    expect(service).toBeTruthy();
  });
});
