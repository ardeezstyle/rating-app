import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';
import { Property, Address } from 'src/app/models/commons';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { RatingService } from 'src/app/services/rating.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  centers: any[];
  isloading: boolean = false;
  isLoggedIn: boolean = false;
  aggregatedRatings: any;

  constructor(
    private os: OwnerService,
    private cs: CustomerService,
    private rs: RatingService
  ) { }

  ngOnInit() {
    this.isLoggedIn = UtilitiesService.isLoggedIn();
    this.getData();
  }

  private getData() {
    this.isloading = true;
    forkJoin(
      this.os.getAllCenters(),
      this.rs.getAggregatedRatings()
    )
    .subscribe(res => {
      // console.log('getAllCenters', res);
      this.centers = res[0];
      this.aggregatedRatings = res[1];
      this.isloading = false;
    });
  }

  searchCenters(f: NgForm) {
    this.isloading = true;
    this.os.getCenterByKeyword(f.value.search).subscribe(res => {
      this.centers = res;
      this.isloading = false;
    });
  }

  // this.os.getAllOwners().subscribe(res => console.log(res));
  // this.cs.getAllCustomers().subscribe(res => console.log('getAllCustomers', res));


  // fetchCenters() {
  //   this.os.getAllCenters().subscribe(res => console.log('getAllCenters', res));
  //   this.os.getOwner('-M-eGKEtpzW_bYnqFyGj').subscribe(res => console.log('getOwner', res));
  //   this.os.getAllCentersByOwnerID('-M-eGKEtpzW_bYnqFyGj').subscribe(res => console.log('getAllCentersByOwnerID', res));
  //
  //   this.os.getCenterByKeyword('elhaven').subscribe(res => console.log('getCenterByKeyword', res));
  // }
  //
  // fetchUsers() {
  //   this.cs.getAllCustomersByOwnerID('-M-eGKEtpzW_bYnqFyGj').subscribe(res => console.log('getAllCustomersByOwnerID', res));
  //   this.cs.getAllCustomersByCenterName('-M-eGKEtpzW_bYnqFyGj', 'Tom Keitons').subscribe(res => console.log('getAllCustomersByCenterName', res));
  // }
}
