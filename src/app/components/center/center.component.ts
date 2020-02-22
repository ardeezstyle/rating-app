import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from 'src/app/services/owner.service';
import { RatingService } from 'src/app/services/rating.service';
import { Property } from 'src/app/models/commons';
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
      this.center_name = res.center_name;
      this.owner_id = res.owner_id;
      forkJoin(
          this.os.getCenterByOwnerIDName(this.owner_id, this.center_name),
          this.rs.getAggregatedRatingsByOwner(this.owner_id)
      )
      .subscribe(response => {
        console.log(response);
        this.center = response[0];
        this.rating = response[1] && response[1][this.center_name] ? response[1][this.center_name] : 'Not Rated';
        this.isloading = false;
      });
    });
  }

  public get getOwnerName() {
    this.os.getOwner(this.owner_id).subscribe(res => this.owner_name = res.first_name + ' ' + res.last_name );
    return this.owner_name;
  }

}
