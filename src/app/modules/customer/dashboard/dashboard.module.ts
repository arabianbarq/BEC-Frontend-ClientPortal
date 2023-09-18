import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { DashboradRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        SharedModule,
        DashboradRoutingModule,
        ChartsModule,
        ProgressbarModule.forRoot()
    ]
})
export class DashboardModule { }