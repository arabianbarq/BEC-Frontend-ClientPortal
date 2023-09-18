import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentFeedbackModule } from './comments-feedback-routing.module';
import { CommentsFeedbackComponent } from './comments-feedback.component';


@NgModule({
declarations: [CommentsFeedbackComponent],
imports: [
SharedModule,
CommentFeedbackModule


]
})
export class CommentsFeedbackModule {
    
  
 }