import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../customer/layout/layout.component';

const CustomerRoutes: Routes = [
  {
  path: "",
    component: LayoutComponent,
    children: [
    {
      path: "",
      redirectTo: "dashboard",
      pathMatch: "full"
    },
    {
      path: "dashboard",
      loadChildren: "./dashboard/dashboard.module#DashboardModule"
    },
    {
      path: "jobsinprogress",
      loadChildren: "./jobs-in-progress/jobs-in-progress.module#JobsInProgressModule"
    },
    {
      path:"profile",
      loadChildren:"./profile/profile.module#ProfileModule"
    },
    {
      path:"comments-feedback",
      loadChildren:"./comments-feedback/comments-feedback.module#CommentsFeedbackModule"
    },
    {
      path:"add-comment",
      loadChildren:"./add-comment/add-comment.module#AddCommentModule"
    },
    {
      path: "clientReport",
      loadChildren: "./client-report/client-report.module#ClientReportModule"
    },

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CustomerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
