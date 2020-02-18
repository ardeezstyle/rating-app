import { Component, OnInit } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { Owner } from 'src/app/models/commons';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  owners: Owner[];
  isloading: boolean = false;

  constructor(
    private os: OwnerService,
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.os.getAllOwners().subscribe(res => {
      this.owners = res;
      this.isloading = false;
    });
  }

}
