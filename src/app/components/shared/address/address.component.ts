import { Component, OnInit, Input } from '@angular/core';
import { Address } from 'src/app/models/commons';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() type: string; // inline & block
  @Input() address: Address;
  constructor() { }

  ngOnInit() {
console.log(this.address);
  }

}
