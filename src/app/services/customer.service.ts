import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/commons';
import { CUSTOMERDB } from '../config/dbconfig';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // public static Customers: Customer[];
  customers: Customer[];

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    if(this.customers && this.customers.length > 0) {
      return of(this.customers);
    } else {
      return this.http.get(CUSTOMERDB).pipe(
        map(_response => {
          const customers = [];
          for(let key in _response) {
            customers.push({..._response[key], id: key});
          }

          this.customers = [...customers];
          return customers;
        })
      );
    }
  }

  getCustomer(id: string) : Observable<Customer> {
    if(this.customers && this.customers.length > 0) {
      const customer = this.customers.filter(c => c.id === id)[0];
      return of(customer);
    } else {
      return this.http.get(CUSTOMERDB).pipe(
        map(_response => {
          return {..._response[id], id: id}
        })
      );
    }
  }

  getAllCustomersByOwnerID(id: string): Observable<Customer[]> {
    if(this.customers && this.customers.length > 0) {
      return of(this.customers.filter(c => c.center_owner_id === id));
    } else {
      return this.http.get(CUSTOMERDB).pipe(
        map(_response => {
          const customers: Customer[] = [];
          for(let key in _response) {
            if(_response[key]['center_owner_id'] === id) {
                customers.push({..._response[key], id: key});
            }
          }
          return customers;
        })
      );
    }
  }

  getAllCustomersByCenterName(id: string, name: string): Observable<Customer[]> {
    if(this.customers && this.customers.length > 0) {
      return of(this.customers.filter(c => c.center_owner_id === id && c.center === name));
    } else {
      return this.http.get(CUSTOMERDB).pipe(
        map(_response => {
          const customers: Customer[] = [];
          for(let key in _response) {
            if(_response[key]['center_owner_id'] === id && _response[key]['center'] === name ) {
                customers.push({..._response[key], id: key});
            }
          }
          return customers;
        })
      );
    }
  }

  getCustomerCount(): Observable<number> {
    if(this.customers && this.customers.length) {
      return of(this.customers.length);
    } else {
      return this.getAllCustomers().pipe(
        map(response => response.length)
      )
    }
  }
}
