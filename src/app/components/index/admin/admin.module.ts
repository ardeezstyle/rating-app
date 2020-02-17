import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owners/owner/owner.component';
import { CentersComponent } from './owners/centers/centers.component';
import { CenterComponent } from './owners/centers/center/center.component';

@NgModule({
  declarations: [DashboardComponent, AdminComponent, CustomerComponent, CustomersComponent, OwnersComponent, OwnerComponent, CentersComponent, CenterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [DashboardComponent, AdminComponent]
})
export class AdminModule { }
