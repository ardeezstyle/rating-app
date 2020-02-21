import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/commons';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from 'src/app/services/owner.service';
import { RatingService } from 'src/app/services/rating.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  owner: Owner;
  isloading: boolean = false;
  private rating;

  constructor(
    private route: ActivatedRoute,
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
      this.os.getOwner(owner_id),
      this.rs.getAggregatedRatingsByOwner(owner_id)
    ).subscribe(response => {
      this.owner = response[0];
      this.rating = response[1];
      this.isloading = false;
    })
  }

  get getAvgRating(){
    return this.rating && this.rating.avg ? this.rating.avg : 'Not Rated';
  }




}
