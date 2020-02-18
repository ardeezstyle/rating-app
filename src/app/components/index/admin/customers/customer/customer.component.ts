import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/commons';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customer: Customer;
  isloading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private cs: CustomerService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.route.params.subscribe(res => {
      console.log(res.id);
      this.cs.getCustomer(res.id).subscribe(res => {
        this.customer = res;
        this.isloading = false;
      });
    });
  }

}
