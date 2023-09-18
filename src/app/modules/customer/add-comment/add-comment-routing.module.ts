import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddCommentComponent} from './add-comment.component';

const routes: Routes = [
  {
    path: "",
    component: AddCommentComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCommentRoutingModule { }
