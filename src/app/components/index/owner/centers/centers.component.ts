import { Component, OnInit } from '@angular/core';

import { OwnerService } from 'src/app/services/owner.service';
import { RatingService } from 'src/app/services/rating.service';
import { Property } from 'src/app/models/commons';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  centers: Property[];
  isloading: boolean = false;
  private rating: any;

  constructor(
    private os: OwnerService,
    private rs: RatingService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.isloading = true;
    const owner_id = UtilitiesService.getUserId();
    forkJoin(
      this.os.getAllCentersByOwnerID(owner_id),
      this.rs.getAggregatedRatingsByOwner(owner_id)
    ).subscribe(response => {
      this.centers = response[0];
      this.rating = response[1];
      this.isloading = false;
    })

  }

  getCenterRating(center) {
    if(this.rating && this.rating[center]) {
      return this.rating[center];
    }
    return 'Not Rated';
  }

}
