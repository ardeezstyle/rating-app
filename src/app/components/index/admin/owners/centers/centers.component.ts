import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { Property } from 'src/app/models/commons';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  centers: Property[];
  isloading: boolean;

  constructor(
    private os: OwnerService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.isloading = true;
    this.os.getAllCenters().subscribe(res => {
      this.centers = res;
      this.isloading = false;
    });
  }

}
