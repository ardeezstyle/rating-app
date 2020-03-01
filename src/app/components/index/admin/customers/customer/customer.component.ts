import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer, Rating } from 'src/app/models/commons';
import { CustomerService } from 'src/app/services/customer.service';
import { RatingService } from 'src/app/services/rating.service';
import { forkJoin } from 'rxjs';
import { CentersService } from 'src/app/services/mock-center.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customer: any;
  isloading: boolean = false;
  customer_name: string = '';
  ratings: Rating[];
  cur_date: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private centersService: CentersService,
    private cs: CustomerService,
    private rs: RatingService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
        this.customer = this.centersService.getCustomer(params.id);

        console.log(this.customer);
    });
  }

private getData() {

}

  // private getData() {
  //   this.isloading = true;
  //   this.route.params.subscribe(res => {
  //     forkJoin(
  //         this.cs.getCustomer(res.id),
  //         this.rs.getAllRatingsByCustomer(res.id)
  //     )
  //     .subscribe({
  //       next: res => {
  //         this.customer = res[0];
  //         this.customer_name = this.customer.first_name + ' ' + this.customer.middle_name + ' ' + this.customer.last_name;
  //         this.ratings = res[1];
  //         this.isloading = false;
  //       },
  //       error: error => console.log(error)
  //     });
  //   });
  // }
}
