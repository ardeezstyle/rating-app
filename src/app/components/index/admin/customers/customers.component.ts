import { Component, OnInit } from '@angular/core';


import { CentersService } from 'src/app/services/mock-center.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any[];
  isloading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private centersService: CentersService
  ) { }

  ngOnInit() {



    this.route.params.subscribe(params => {
      const center = this.centersService.getCenter(params.id);
      this.customers = this.centersService.getCenterCustomers(center.center);
    })

    // this.isloading = true;
    // this.cs.getAllCustomers().subscribe(res => {
    //   this.customers = res;
    //   this.isloading = false;
    // });
  }

}
