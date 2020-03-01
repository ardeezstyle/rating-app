import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { SharedModule } from '../../shared/shared.module';
import { CenterComponent } from './center/center.component';
import { RatingsComponent } from './ratings/ratings.component';
import { DetailsComponent } from './customers/customer/details/details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    CustomerComponent,
    CustomersComponent,
    CenterComponent,
    RatingsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports: [DashboardComponent, AdminComponent]
})
export class AdminModule { }
