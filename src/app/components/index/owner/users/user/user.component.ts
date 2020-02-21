import { Component, OnInit } from '@angular/core';
import { Customer, Rating } from 'src/app/models/commons';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { RatingService } from 'src/app/services/rating.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  customer: Customer;
  isloading: boolean = false;
  customer_name: string = '';
  ratings: Rating[];

  constructor(
    private route: ActivatedRoute,
    private cs: CustomerService,
    private rs: RatingService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.route.params.subscribe(res => {
      forkJoin(
          this.cs.getCustomer(res.id),
          this.rs.getAllRatingsByCustomer(res.id)
      )
      .subscribe({
        next: res => {
          this.customer = res[0];
          this.customer_name = this.customer.first_name + ' ' + this.customer.middle_name + ' ' + this.customer.last_name;
          this.ratings = res[1];
          this.isloading = false;
        },
        error: error => console.log(error)
      });
    });
  }

}
