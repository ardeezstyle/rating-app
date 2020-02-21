import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  centers: any[];
  isloading: boolean = false;

  constructor(
    private os: OwnerService,
    private cs: CustomerService
  ) { }

  ngOnInit() {
    // this.os.getAllOwners().subscribe(res => console.log(res));
    // this.cs.getAllCustomers().subscribe(res => console.log('getAllCustomers', res));
    this.isloading = true;
    this.os.getAllCenters().subscribe(res => {
      // console.log('getAllCenters', res);
      this.centers = res;
      this.isloading = false;
    });
  }


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

  searchCenters(f: NgForm) {
    this.isloading = true;
    this.os.getCenterByKeyword(f.value.search).subscribe(res => {
      this.centers = res;
      this.isloading = false;
    });
  }

}
