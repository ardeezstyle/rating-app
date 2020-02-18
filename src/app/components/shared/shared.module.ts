import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [LoadingComponent, AddressComponent],
  imports: [
    CommonModule
  ],
  exports:  [LoadingComponent, AddressComponent]
})
export class SharedModule { }
