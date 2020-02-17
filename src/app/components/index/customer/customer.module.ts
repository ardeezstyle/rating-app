import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [CustomerComponent, ProfileComponent, RatingComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ],
  exports: [CustomerComponent]
})
export class CustomerModule { }
