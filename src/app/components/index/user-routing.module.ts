import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AuthDataResolverService } from 'src/app/services/auth-data-resolver.service';

const index_routes: Routes = [
  {path: 'page', component: IndexComponent,
  canActivate: [AuthGuard],
  resolve: {user: AuthDataResolverService},
  children: [
    {path: 'admin', component: AdminComponent},
    {path: 'owner', component: OwnerComponent},
    {path: 'customer', component: CustomerComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(index_routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
