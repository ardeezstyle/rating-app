import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CentersService } from 'src/app/services/mock-center.service';
import { Program } from 'src/app/models/commons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  filtered: boolean = false;

  centers: any[];
  programs: Program[];
  total_seats: any;

  owner_count: number = 0;
  center_count: number = 0;
  customer_count: number = 0;

  constructor(
    private route: ActivatedRoute,
    private centersService: CentersService,
    private cs: CustomerService,
    private os: OwnerService
  ) { }

  ngOnInit() {
    this.centers = this.centersService.getAllCenters();
    this.programs = this.centersService.getPrograms();
    this.total_seats = this.centersService.getAllSeatsCount();

    this.route.queryParams.subscribe(params => {
      this.filtered = Object.keys(params).length ? true : false;
      if(this.filtered) this.filterData(params);
    });
  }

  private filterData(condition: any) {
    console.log(this.centers);
    Object.keys(condition).map(key => console.log(key, condition[key]));
    const key = Object.keys(condition)[0];
    this.centers = this.centers.filter(center => center[key] == condition[key]);
  }

  closeWindow() {
    window.close();
  }

  getData() {
    this.loading = true;

    forkJoin(
      this.cs.getCustomerCount(),
      this.os.getOwnersAndPropertyCount()
    ).subscribe({
      next: res => {
        this.owner_count = res[1].owner;
        this.center_count = res[1].property;
        this.customer_count = res[0];
        this.loading = false;
      },
      error: err => console.log(err)
    })
  }
}
