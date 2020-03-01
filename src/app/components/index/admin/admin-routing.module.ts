import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from '../../not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminComponent } from './admin.component';
import { CenterComponent } from './center/center.component';
import { RatingsComponent } from './ratings/ratings.component';
import { DetailsComponent } from './customers/customer/details/details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'admin', component: AdminComponent, children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: 'center/:id', component: CenterComponent},
          {path: 'center/:id/customers', component: CustomersComponent},
          {path: 'center/:center_id/ratings', component: RatingsComponent},

          {path: 'customers', component: CustomersComponent},
          {path: 'customers/:id', component: CustomerComponent},
          {path: 'customers/:customer_id/ratings', component: RatingsComponent},
          {path: 'customers/:customer_id/details', component: DetailsComponent},

          {path: 'ratings', component: RatingsComponent},
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: '**', component: NotFoundComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
