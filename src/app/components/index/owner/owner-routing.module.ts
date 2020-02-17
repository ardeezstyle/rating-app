import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OwnerComponent } from './owner.component';
import { CentersComponent } from './centers/centers.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertyComponent } from './property/property.component';
import { CenterComponent } from './centers/center/center.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';

import { NotFoundComponent } from '../../not-found/not-found.component';

const index_routes: Routes = [
  {
    path: 'owner', component: OwnerComponent, children: [
      {path: 'centers', component: CentersComponent},
      {path: 'centers/:name', component: CenterComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'users', component: UsersComponent},
      {path: 'users/:id', component: UserComponent},
      {path: 'property', component: PropertyComponent},
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(index_routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
