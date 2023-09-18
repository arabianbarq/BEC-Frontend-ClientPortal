import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { CustomTableComponent } from './custom-table.component';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule
  ],
  // declarations: [CustomTableComponent],
  // exports: [CustomTableComponent],
})
export class SmartadminCustomTableModule { }
