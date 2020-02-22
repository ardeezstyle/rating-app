import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Owner } from 'src/app/models/commons';
import { USER_TYPES } from 'src/app/config/enums.enum';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  owner: Owner;
  sameAddress: boolean = false;
  isFormValid: boolean = true;
  isSuccess: boolean;

  constructor(
    private os: OwnerService
  ) { }

  ngOnInit() {
  }

  saveData(f: NgForm) {
    const ownerFormValues = f.value;
    const programs = [];
    if(ownerFormValues.program1) programs.push('3 Months Program');
    if(ownerFormValues.program2) programs.push('6 Months Program');
    if(ownerFormValues.program3) programs.push('9 Months Program');

    this.owner = {
      email: ownerFormValues.email,
      first_name: ownerFormValues.first_name,//   first_name?: string;
      last_name: ownerFormValues.last_name,//   last_name?: string;
      password: ownerFormValues.password,//   password: string;
      phone: ownerFormValues.phone,//   phone?: string;
      address: {
        city: ownerFormValues.city,
        country: ownerFormValues.country,
        postal_code: ownerFormValues.postal_code,
        state: ownerFormValues.state,
        street: ownerFormValues.street
      },

      type: USER_TYPES.OWNER,
      properties: [{
          name: ownerFormValues.center_name,
          program: [...programs],
          address: {
            city: this.sameAddress ? ownerFormValues.city : ownerFormValues.center_city,
            country: this.sameAddress ? ownerFormValues.country : ownerFormValues.center_country,
            postal_code: this.sameAddress ? ownerFormValues.postal_code : ownerFormValues.center_postal_code,
            state: this.sameAddress ? ownerFormValues.state : ownerFormValues.center_state,
            street: this.sameAddress ? ownerFormValues.street : ownerFormValues.center_street
          }
      }]
    }

    if(f.status === 'VALID') {
      this.isFormValid = true;
      this.os.addOwner(this.owner).subscribe(res => {
        f.reset();
        console.log(res);
        this.isSuccess = true;
      });
    } else {
      this.isFormValid = false;
    }
  }

  isSameAddress(event) {
    this.sameAddress = event.currentTarget.checked;
  }

}
