import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/models/commons';
import { OwnerService } from 'src/app/services/owner.service';
import { RatingService } from 'src/app/services/rating.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  center: Property;
  isloading: boolean = false;
  rating: number;
  owner_id: string = '';
  owner_name: string = '';
  center_name: string = '';

  tabs = {
    customers: 'LIST OF CUSTOMERS',
    ratings: 'RATINGS BY CUSTOMERS'
  }
  selectedTab: string = this.tabs.customers;

  constructor(
    private route: ActivatedRoute,
    private os: OwnerService,
    private rs: RatingService
  ) {
    this.selectedTab = this.tabs.customers;
  }

  ngOnInit() {
    // this.getData();
  }

  private getData() {
    this.isloading = true;
    this.route.params.subscribe(res => {
      this.owner_id = res.id;
      this.center_name = res.center;
      forkJoin(
          this.os.getCenterByOwnerIDName(this.owner_id, this.center_name),
          this.rs.getAggregatedRatingsByOwner(this.owner_id)
      )
      .subscribe(res => {
        this.center = res[0];
        this.rating = res[1] && res[1][this.center_name] ? res[1][this.center_name] : 'Not Rated';
        this.isloading = false;
      });
    });
  }

  public get getOwnerName() {
    this.os.getOwner(this.owner_id).subscribe(res => this.owner_name = res.first_name + ' ' + res.last_name );
    return this.owner_name;
  }


  show(event: any) {
    console.log(event.currentTarget.textContent);
    this.selectedTab = event.currentTarget.textContent;
  }
}
