import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GetPasswordComponent } from './get-password/get-password.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [GetPasswordComponent]
})
export class HomeModule { }
