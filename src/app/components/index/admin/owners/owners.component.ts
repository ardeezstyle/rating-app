import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { Owner } from 'src/app/models/commons';
import { RatingService } from 'src/app/services/rating.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  owners: Owner[];
  private ratings: any;
  isloading: boolean = false;

  constructor(
    private os: OwnerService,
    private rs: RatingService
  ) { }

  ngOnInit() {
    this.getData();
    // this.os.getAllOwners().subscribe(res => {
    //   this.owners = res;
    //   this.isloading = false;
    // });

    // this.rs.getAllRatings().subscribe(res => console.log(res));
    // this.rs.getAllRatingsByCustomer('-M-mMtEAJy_qIJK-R_rq').subscribe(res => console.log(res));

    // this.rs.getAllRatingsByOwner('-M-eGKEtpzW_bYnqFyGj').subscribe(res => console.log(res));

    // this.rs.getAllRatingsByOwners().subscribe(res => console.log("Ratings", res));
  }


  private getData() {
    this.isloading = true;
    forkJoin(
      this.os.getAllOwners(),
      this.rs.getAllRatingsByOwners()
    ).subscribe(response => {
      this.isloading = false;
      this.owners = response[0];
      this.ratings = response[1];
    })
  }

  getOwnerRating(id: string): number {
    return this.ratings[id] && this.ratings[id]['avg'] ? this.ratings[id]['avg'] : 'Not Rated';
  }

}
