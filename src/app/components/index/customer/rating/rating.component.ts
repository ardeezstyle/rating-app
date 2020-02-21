import { Component, OnInit } from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Rating } from 'src/app/models/commons';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  loading: boolean = false;
  ratings: Rating[];

  constructor(
    private rs: RatingService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.loading = true;
    this.rs.getAllRatingsByCustomer(UtilitiesService.getUserId()).subscribe({
      next: res => {
        this.ratings = res;
        this.loading = false;
      },
      error: error => console.log(error)
    });
  }

}
