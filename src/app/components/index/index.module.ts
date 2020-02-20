import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { CustomerModule } from './customer/customer.module';
import { OwnerModule } from './owner/owner.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AdminModule,
    OwnerModule,
    CustomerModule
  ],
  exports: [IndexComponent, AdminModule, OwnerModule, CustomerModule]
})
export class IndexModule { }
