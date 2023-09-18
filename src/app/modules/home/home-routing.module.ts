import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetPasswordComponent } from './get-password/get-password.component';



const HomeRoutes: Routes = [
  {
      path: "",
      redirectTo: "login",
      pathMatch: "full"
    },
    {
      path: "login",
      loadChildren: "./login/login.module#LoginModule"
    },
    {
      path: "getPassword",
      component: GetPasswordComponent
    }
    // {
    //   path: "forgotPassword",
    //   loadChildren: "./forgot-password/forgot-password.module#ForgotPasswordModule"
    // }
];

@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
