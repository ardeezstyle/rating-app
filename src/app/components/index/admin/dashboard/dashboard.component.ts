import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  owner_count: number = 0;
  center_count: number = 0;
  customer_count: number = 0;
  constructor(
    private cs: CustomerService,
    private os: OwnerService
  ) { }

  ngOnInit() {
    // this.getData();
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
