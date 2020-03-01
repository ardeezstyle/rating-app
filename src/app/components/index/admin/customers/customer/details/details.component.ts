import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentersService } from 'src/app/services/mock-center.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  customer: any;

  constructor(
    private route: ActivatedRoute,
    private centersService: CentersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customer = this.centersService.getCustomer(params.id);


      console.log(this.customer);
    })
  }

  closeWindow() {
    window.close();
  }
}
