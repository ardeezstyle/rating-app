import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CentersService } from 'src/app/services/mock-center.service';
import { Program } from 'src/app/models/commons';


@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {
  center: any;
  date: Date;
  programs: Program[];

  seats: any;

  // center: Property;
  // isloading: boolean = false;
  // rating: number;
  // owner_id: string = '';
  // owner_name: string = '';
  // center_name: string = '';

  constructor(
    private route: ActivatedRoute,
    private centersService: CentersService
  ) { }

  ngOnInit() {
    // this.getData();
    this.date = new Date();

    this.route.params.subscribe(params => {
      if(params['id']) {
        this.center = this.centersService.getCenter(params['id']);

        this.programs = this.centersService.getProgramsByCenter(this.center.center);

        this.seats = this.centersService.getCenterSeats(this.center.center);


        console.log(this.seats);
      }
    })
  }

  // private getData() {
  //   this.isloading = true;
  //   this.route.params.subscribe(res => {
  //     this.owner_id = res.id;
  //     this.center_name = res.center;
  //     forkJoin(
  //         this.os.getCenterByOwnerIDName(this.owner_id, this.center_name),
  //         this.rs.getAggregatedRatingsByOwner(this.owner_id)
  //     )
  //     .subscribe(res => {
  //       this.center = res[0];
  //       this.rating = res[1] && res[1][this.center_name] ? res[1][this.center_name] : 'Not Rated';
  //       this.isloading = false;
  //     });
  //   });
  // }
  //
  // public get getOwnerName() {
  //   this.os.getOwner(this.owner_id).subscribe(res => this.owner_name = res.first_name + ' ' + res.last_name );
  //   return this.owner_name;
  // }
}
