import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index.component';
import { CustomerModule } from './customer/customer.module';
import { OwnerModule } from './owner/owner.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AdminModule,
    OwnerModule,
    CustomerModule,
    UserRoutingModule
  ],
  exports: [IndexComponent]
})
export class IndexModule { }
