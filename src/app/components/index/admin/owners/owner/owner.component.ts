import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/models/commons';
import { OwnerService } from 'src/app/services/owner.service';
import { RatingService } from 'src/app/services/rating.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
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
    this.route.params.subscribe(res => {
      forkJoin(
        this.os.getOwner(res.id),
        this.rs.getAggregatedRatingsByOwner(res.id)
      ).subscribe(response => {
        this.owner = response[0];
        this.rating = response[1];
        this.isloading = false;
      })
    });
  }

  get getAvgRating(){
    return this.rating && this.rating.avg ? this.rating.avg : 'Not Rated';
  }

  getCenterRating(center) {
    if(this.rating && this.rating[center]) {
      return this.rating[center];
    }
    return 'Not Rated';
  }
}
