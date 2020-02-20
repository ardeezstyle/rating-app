import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RatingComponent } from './rating/rating.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomerComponent, ProfileComponent, RatingComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CustomerRoutingModule
  ],
  exports: [CustomerComponent, ProfileComponent, RatingComponent]
})
export class CustomerModule { }
