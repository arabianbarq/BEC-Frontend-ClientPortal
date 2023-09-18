import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { services } from './services'
import { SharedModule } from '../shared/shared.module';
import { TokenInterceptor, ErrorInterceptor } from './interceptors';

@NgModule({
  declarations: [],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
