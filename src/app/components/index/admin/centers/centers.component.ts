import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  @Input() centers: any[];

  constructor() { }

  ngOnInit() {

    console.log("Checking from component", this.centers);
  }

}
