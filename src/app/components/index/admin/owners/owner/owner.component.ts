import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/models/commons';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  owner: Owner;
  isloading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private os: OwnerService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.route.params.subscribe(res => {
      this.os.getOwner(res.id).subscribe(res => {
        this.owner = res;
        this.isloading = false;
      });
    });
  }

}
