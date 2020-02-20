import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer, Rating } from 'src/app/models/commons';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { RatingService } from 'src/app/services/rating.service';
import { NgModel } from '@angular/forms';

class Response {
  success: boolean;
  message: string;
};
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  customer: Customer;
  loading: boolean = true;
  rating: number = 0;
  showmodal: boolean = false;
  rating_response: Response;

  @ViewChild("modal", {static: null}) modal: ElementRef;

  constructor(
    private customerService: CustomerService,
    private ratingService: RatingService
  ) { }

  ngOnInit() {
    this.getCustomerData();


  }

  getCustomerData(): void{
    this.customerService.getCustomer(UtilitiesService.getUserId()).subscribe(res => {
      this.loading = false;
      this.customer = res;

      console.log(this.customer);
    });
  }

  get getName(): string{
    return this.customer.first_name + ' ' + this.customer.middle_name + ' ' + this.customer.last_name;
  }

  get getDOB(): string{
    return this.customer.birth_anniversary.date + '/' + this.customer.birth_anniversary.month;
  }

  getRatingValue(event: string): void {
    this.rating = +event;
  }

  closeDialog(): void {
    this.showmodal = false;
  }

  openDialog(): void {
    this.showmodal = true;
  }

  dismiss() {
    this.rating_response = null;
  }

  rate(f: NgModel) {
    const rating: Rating = {
      center: this.customer.center,
      comment: f.value.comment,
      date: Date(),
      owner_id: this.customer.center_owner_id,
      program: this.customer.program,
      rating: this.rating,
      user_id: this.customer.id
    };

    this.ratingService.rateProgram(rating).subscribe({
      next: res => {
        this.rating_response = {
          success: true,
          message: "Success! You have successfully rated."
        };
        this.closeDialog();
      },
      error: err => {
        this.rating_response = {
          success: false,
          message: "Failed! There is a problem."
        };
        this.closeDialog();
      }
    });
  }

}
