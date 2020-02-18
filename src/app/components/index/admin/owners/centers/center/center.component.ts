import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/models/commons';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  center: Property;
  isloading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private os: OwnerService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.route.params.subscribe(res => {
      console.log(res);
      this.os.getCenterByOwnerIDName(res.id, res.center).subscribe(res => {
        this.center = res;
        this.isloading = false;
      });
      // this.cs.getCustomer(res.id).subscribe(res => {
      //   this.customer = res;
      //   this.isloading = false;
      // });
    });
  }

}
