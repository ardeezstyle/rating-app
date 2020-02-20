import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading/loading.component';
import { AddressComponent } from './address/address.component';
import { HeaderComponent } from './header/header.component';
import { StarComponent } from './star/star.component';


@NgModule({
  declarations: [LoadingComponent, AddressComponent, HeaderComponent, StarComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:  [LoadingComponent, AddressComponent, HeaderComponent, StarComponent]
})
export class SharedModule { }
