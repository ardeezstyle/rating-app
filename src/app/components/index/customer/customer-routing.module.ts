import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './profile/profile.component';
import { RatingComponent } from './rating/rating.component';

import { NotFoundComponent } from '../../not-found/not-found.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'customer', component: CustomerComponent, children: [
          {path: 'profile', component: ProfileComponent},
          {path: 'ratings', component: RatingComponent},
          {path: '**', component: NotFoundComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
