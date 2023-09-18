import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

// import { ErrorComponent } from './components/error/error.component';


const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: "./modules/home/home.module#HomeModule"
   },
   {
    path: "customer",
    loadChildren: "./modules/customer/customer.module#CustomerModule"
   }
  // {
  //   path: "",
  //   loadChildren: "./modules/home/home.module#HomeModule",
  //   canActivate: [AuthGuard]
  //  },
  // {
  //   path: "404",
  //   component: ErrorComponent
  // },
  // {
  //   path: "**",
  //   component: ErrorComponent
  // }
 
];


@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
