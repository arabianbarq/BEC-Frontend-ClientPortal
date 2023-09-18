import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CustomerHeaderComponent } from './components/customer/customer-header/customer-header.component';
import { CustomerSidebarComponent } from './components/customer/customer-sidebar/customer-sidebar.component';
import { ToastrModule } from "ngx-toastr";
import { RouterModule } from "@angular/router"; 
import { ConfirmEqualValidatorDirective } from './directives/not-equal.directive';
import { GlobalcodeDropdownComponent } from './components/globalcode-dropdown/globalcode-dropdown.component';
import { CustomTableComponent } from './components/UI-component/custom-table.component';
import { BsDatepickerModule, PaginationModule, ModalModule } from 'ngx-bootstrap';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { UtcToLocalPipe } from './directives/utc-to-local.pipe';


@NgModule({
  declarations: [CustomerHeaderComponent, GlobalcodeDropdownComponent,CustomTableComponent, CustomerSidebarComponent,ConfirmEqualValidatorDirective, LoadingScreenComponent, UtcToLocalPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(), 
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule
   
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    CustomerHeaderComponent,
    CustomTableComponent,
    CustomerSidebarComponent,
    ToastrModule,
    BsDatepickerModule,
    RouterModule,
    ModalModule,
    ConfirmEqualValidatorDirective,
    GlobalcodeDropdownComponent,
    LoadingScreenComponent,
    UtcToLocalPipe
  ],
  providers: [
   
  ]
})
export class SharedModule { }
