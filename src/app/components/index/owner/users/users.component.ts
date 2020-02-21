import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/commons';
import { CustomerService } from 'src/app/services/customer.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  customers: Customer[];
  isloading: boolean = false;

  constructor(
    private cs: CustomerService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.cs.getAllCustomersByOwnerID(UtilitiesService.getUserId()).subscribe(res => {
      this.customers = res;
      this.isloading = false;
    });
  }

  //getAllCustomersByCenterName(id, name);
  //getAllCustomersByOwnerID(id);

}
