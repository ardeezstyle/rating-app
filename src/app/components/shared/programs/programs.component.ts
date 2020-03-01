import { Component, OnInit, Input } from '@angular/core';
import { Program } from 'src/app/models/commons';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  @Input() programs: Program[];

  constructor() { }

  ngOnInit() {

    console.log(this.programs);
  }

}
