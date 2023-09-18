import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsFeedbackComponent } from './comments-feedback.component';



const routes: Routes = [
    {
      path: "",
      component: CommentsFeedbackComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentFeedbackModule { }
