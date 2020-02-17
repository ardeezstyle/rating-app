import { Component, OnInit } from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import { OwnerService } from 'src/app/services/owner.service';
import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor(private rs: RatingService,
  private cs: CustomerService,
private as: AdminService,
private os: OwnerService) { }

  ngOnInit() {
    this.rs.getAllRatings().subscribe(res => console.log(res));
    this.os.getAllOwners().subscribe(res => console.log(res));
    this.os.getOwner('-M-eGKEtpzW_bYnqFyGj').subscribe(res => console.log(res));



  }

}
