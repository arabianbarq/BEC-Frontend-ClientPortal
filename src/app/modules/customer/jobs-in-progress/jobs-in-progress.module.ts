import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsInProgressRoutingModule } from './jobs-in-progress-routing.module';
import { JobsInProgressComponent } from './jobs-in-progress.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [JobsInProgressComponent],
  imports: [
    CommonModule,
    JobsInProgressRoutingModule,
    SharedModule
  ]
})
export class JobsInProgressModule { }
