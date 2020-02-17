import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { ProfileComponent } from './profile/profile.component';
import { CentersComponent } from './centers/centers.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CenterComponent } from './centers/center/center.component';


@NgModule({
  declarations: [OwnerComponent, ProfileComponent, CentersComponent, UsersComponent, UserComponent, CenterComponent],
  imports: [
    CommonModule
  ],
  exports: [OwnerComponent, ProfileComponent, CentersComponent, UsersComponent, UserComponent, CenterComponent]
})
export class OwnerModule { }
