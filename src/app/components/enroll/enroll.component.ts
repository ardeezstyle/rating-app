import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/commons';
import { USER_TYPES } from 'src/app/config/enums.enum';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  customer: Customer;
  owner_id: string;
  center_name: string;
  programs: any[];

  isSuccess: boolean;
  isFormValid: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cs: CustomerService,
    private os: OwnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.owner_id = res.owner_id;
      this.center_name = res.center_name;
      this.os.getCenterByOwnerIDName(this.owner_id, this.center_name).subscribe(res => {
        this.programs = res.program;
      });
    })
  }

  saveData(f: NgForm) {
    const customerForm = f.value;
    this.customer = {
      address: { //address?
        city: customerForm.city, //string;
        country: customerForm.country, //string;
        postal_code: customerForm.postal_code, //string;
        state: customerForm.state, //string;
        street: customerForm.street, //string;
      }, //Address;
      age: customerForm.age, //age? string;
      birth_anniversary: {
        date: customerForm.bd_day, //?: string;
        month: customerForm.bd_month, //?: string;
      }, //?: BirthAnniversary;
      center: this.center_name, //center?: string;
      center_owner_id: this.owner_id, //center_owner_id?: string;
      email: customerForm.email, //: string;
      first_name: customerForm.first_name, //string;
      gender: customerForm.gender, //gender?: string;
      last_name: customerForm.last_name, //?: string;
      middle_name: customerForm.middle_name,//?: string;
      password: customerForm.password, //: string;
      phone: customerForm.phone, //?: string;
      program: customerForm.program, //: string;
      type: USER_TYPES.CUSTOMER //: string;
    }
    this.isFormValid = f.valid;

    if(this.isFormValid) {
      this.cs.saveCustomer(this.customer).subscribe(res => {
        console.log(res);
        this.isSuccess = true;
      });
    } else {
      this.isSuccess = false;
    }

  }

}
