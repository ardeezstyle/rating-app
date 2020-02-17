import { Injectable } from '@angular/core';
import { ADMINDB, OWNERDB, CUSTOMERDB } from '../config/dbconfig';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RSLOGIN } from '../config/constants';
import { AuthorisedData } from '../models/commons';
import { ERROR_STATUS, USER_TYPES } from '../config/enums.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  getData(user): Observable<any> {

    if(!user) throw new Error("Invalid user credentials");

    return forkJoin(
      this.http.get(CUSTOMERDB),
      this.http.get(ADMINDB),
      this.http.get(OWNERDB)
    ).pipe(
      map(response => {
        let matchedUser: AuthorisedData;

        const customers = response[0];
        const owners = response[2];
        const admins = response[1];

        for(let key in customers) {
          if(customers[key]['email'] === user.email && customers[key]['password'] === user.password) {
            matchedUser = {type: customers[key].type, id: key};
          }
        }

        for(let key in owners) {
          if(owners[key]['email'] === user.email && owners[key]['password'] === user.password) {
            matchedUser = {type: owners[key].type, id: key};
          }
        }

        for(let key in admins) {
          if(admins[key]['email'] === user.email && admins[key]['password'] === user.password) {
            matchedUser = {type: admins[key].type, id: key};
          }
        }

        if(!matchedUser) {
          throw new Error(ERROR_STATUS.UNAUTHORIZED);
        } else {
          return matchedUser;
        }

      })
    )
  }

  getAdmin(): Observable<any>{
    return this.http.get(ADMINDB);
  }

  isAuthorised(): boolean {
    let user;
    if(localStorage) {
      user = localStorage.getItem(RSLOGIN);
    }

    return user != null;
  }

  isAdmin(): boolean {
    let user;
    if(localStorage) {
      user = localStorage.getItem(RSLOGIN);
    }

    return user != null && JSON.parse(user).type === USER_TYPES.ADMIN;
  }

  isOwner(): boolean {
    let user;
    if(localStorage) {
      user = localStorage.getItem(RSLOGIN);
    }

    return user != null && JSON.parse(user).type === USER_TYPES.OWNER;
  }

  isCustomer(): boolean {
    let user;
    if(localStorage) {
      user = localStorage.getItem(RSLOGIN);
    }

    return user != null && JSON.parse(user).type === USER_TYPES.CUSTOMER;
  }

  logout(): void {
    if(localStorage) {
      localStorage.removeItem(RSLOGIN);
    }
    this.router.navigate(['/']);
  }

}
//
// map(response => {
//   const admin: Admin = {
//     email: '',
//     name: '',
//     password: '',
//     type: ''
//   };
//
//   return admin;
// })
