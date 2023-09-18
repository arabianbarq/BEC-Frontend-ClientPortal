import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsInProgressComponent } from './jobs-in-progress.component';


const routes: Routes = [
  {
    path: "",
    component: JobsInProgressComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsInProgressRoutingModule { }
