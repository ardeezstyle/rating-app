import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Property } from 'src/app/models/commons';
import { OwnerService } from 'src/app/services/owner.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  property: Property;
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

    this.property = {
      name: ownerFormValues.center_name,
      program: [...programs],
      address: {
        city: ownerFormValues.center_city,
        country: ownerFormValues.center_country,
        postal_code: ownerFormValues.center_postal_code,
        state: ownerFormValues.center_state,
        street: ownerFormValues.center_street
      }
    }

    if(f.status === 'VALID') {
      this.isFormValid = true;
      // this.os.addOwner(this.owner).subscribe(res => {
      //   f.reset();
      //   console.log(res);
      //   this.isSuccess = true;
      // });
      const owner_id = UtilitiesService.getUserId();
      this.os.getAllCentersByOwnerID(owner_id).subscribe(centers => {
        console.log(centers);
        const updatedCenters = [...centers, {...this.property}];

        console.log(updatedCenters);

        this.os.addProperty(updatedCenters, owner_id).subscribe({
          next: res => {
            f.reset();
            console.log(res);
            this.isSuccess = true;
          },
          error: error => console.log(error)
        });
      })
    } else {
      this.isFormValid = false;
    }
  }

}
