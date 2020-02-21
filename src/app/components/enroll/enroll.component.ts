import { Component, OnInit } from '@angular/core';
import { Customer, BirthAnniversary } from 'src/app/models/commons';
import { USER_TYPES } from 'src/app/config/enums.enum';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  customer: Customer;
  owner_id: string;
  center_name: string;

  constructor(
    private route: ActivatedRoute,
    private cs: CustomerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      console.log(res);
      this.owner_id = res.owner_id;
      this.center_name = res.center_name;
    })
  }

  saveData(f: NgForm) {
    this.customer = {
      address: { //address?
        city: '', //string;
        country: '', //string;
        postal_code: '', //string;
        state: '', //string;
        street: '', //string;
      }, //Address;
      age: '', //age? string;
      birth_anniversary: {
        date: '', //?: string;
        month: '', //?: string;
      }, //?: BirthAnniversary;
      center: '', //center?: string;
      center_owner_id: '', //center_owner_id?: string;
      email: '', //: string;
      first_name: '', //string;
      gender: '', //gender?: string;
      last_name: '', //?: string;
      middle_name: '',//?: string;
      password: '', //: string;
      phone: '', //?: string;
      program: '', //: string;
      type: USER_TYPES.CUSTOMER //: string;
    }


    console.log(this.customer);

  }

}
