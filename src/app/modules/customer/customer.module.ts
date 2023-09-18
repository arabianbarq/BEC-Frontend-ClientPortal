import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from '../customer/layout/layout.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
