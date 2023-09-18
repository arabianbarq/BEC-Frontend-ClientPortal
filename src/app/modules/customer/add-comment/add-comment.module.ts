import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCommentRoutingModule } from './add-comment-routing.module';
import { AddCommentComponent } from './add-comment.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddCommentComponent],
  imports: [
    CommonModule,
    AddCommentRoutingModule,
    SharedModule
  
  ]
})
export class AddCommentModule { }
