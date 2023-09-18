import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
// import { ChartsModule } from 'ng2-charts';


const routes: Routes = [
    {
      path: "",
      component: DashboardComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)
    // ,ChartsModule
  ],
  exports: [RouterModule]
})
export class DashboradRoutingModule { }
