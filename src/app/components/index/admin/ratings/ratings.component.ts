import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentersService } from 'src/app/services/mock-center.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  ratings: any[];

  isCenter: boolean = false;
  isCustomer: boolean = false;
  cur_date: Date = new Date();

  center: any;

  constructor(
    private route: ActivatedRoute,
    private centersService: CentersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.center_id) {
        console.log('List all ratings by All Customers of the center');
        this.isCenter = true;
        this.center = this.centersService.getCenter(params.center_id);
        this.ratings = this.centersService.getRatingsByCenter(this.center.center);


        console.log(this.center);
      } else if (params.customer_id) {
        console.log('List all ratings by Customer');
        this.isCustomer = true;
        this.ratings = this.centersService.getRatings(params.customer_id);
      }

      console.log(this.ratings);
    });
  }

}
