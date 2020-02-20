import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  @Output() clicked:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickedStar(f: NgForm) {
    const val = f.form.value.rating;

    console.log(val);
    this.clicked.emit(val);
  }

}
