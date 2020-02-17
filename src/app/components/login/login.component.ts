import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { AuthorisedData } from 'src/app/models/commons';
import { RSLOGIN } from 'src/app/config/constants';
import { ERROR_STATUS } from 'src/app/config/enums.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isWrongCredentials: boolean = false;

  constructor(private router: Router, private as: AuthService) { }

  ngOnInit() {
  }

  login(f: NgForm): void {
    // this.router.navigate(['/page']);

    // console.log(f.value.email, f.value.password);
    // const admin = {
    //   email: 'john@gmail.com',
    //   password: 'admin123'
    // };
    // const owner = {
    //   email: 'mike@tyson.com',
    //   password: 'administrator'
    // };
    // const customer = {
    //   email: 'steve.ross@hotmail.com',
    //   password: 'password'
    // };

    const user = {
      email: f.value.email,
      password: f.value.password
    }

    this.as.getData(user).subscribe(
      (res: AuthorisedData) => {
        console.log(res);
        if(localStorage) {
          localStorage.setItem(RSLOGIN, JSON.stringify(res));
        }
        this.router.navigate(['/page']);
      },
      (error: Error) => {
        this.isWrongCredentials = true;
        // console.log(error.message, error.name, error.stack);
        if(error.message===ERROR_STATUS.UNAUTHORIZED) {
          localStorage.removeItem(RSLOGIN);
        }
      }
    );
  }
}
