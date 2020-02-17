import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RSLOGIN } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthDataResolverService implements Resolve<any> {

  constructor() { }

  resolve(): Observable<any> {
    let user = {};

    if(localStorage && localStorage.getItem(RSLOGIN)) {
      user = {...JSON.parse(localStorage.getItem(RSLOGIN))};
    }

    const observable = Observable.create(observer => {
      observer.next(user);
      observer.complete();
    })
    return observable;
  }


}
