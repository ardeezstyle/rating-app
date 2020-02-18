import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/commons';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  isloading: boolean = false;

  constructor(
    private cs: CustomerService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.cs.getAllCustomers().subscribe(res => {
      this.customers = res;
      this.isloading = false;
    });
  }

}
