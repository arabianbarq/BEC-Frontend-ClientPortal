import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientReportRoutingModule } from './client-report-routing.module';
import { ClientReportComponent } from './client-report.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ClientReportComponent],
  imports: [
    CommonModule,
    ClientReportRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class ClientReportModule { }
