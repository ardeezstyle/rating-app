import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from '../../not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owners/owner/owner.component';
import { CenterComponent } from './owners/centers/center/center.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'admin', component: AdminComponent, children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: 'owners', component: OwnersComponent},
          {path: 'owners/:id', component: OwnerComponent},
          {path: 'owners/:id/centers/:center', component: CenterComponent},
          {path: 'customers', component: CustomersComponent},
          {path: 'customers/:id', component: CustomerComponent},
          {path: '**', component: NotFoundComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
