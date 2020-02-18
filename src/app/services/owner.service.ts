import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OWNERDB } from '../config/dbconfig';
import { map } from 'rxjs/operators';
import { Owner, Property } from '../models/commons';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  owners: Owner[];
  constructor(private http: HttpClient) {}

  getAllOwners(): Observable<any[]> {
    return this.http.get(OWNERDB).pipe(
      map(response => {
        const owners = [];
        for(let key in response) {
          owners.push({...response[key], id: key});
        }

        this.owners = [...owners];
        return owners;
      })
    );
  }

  getOwner(id: string) : Observable<any> {
    if(this.owners && this.owners.length > 0) {
      const owner = this.owners.filter(owner => owner.id === id)[0];
      return of(owner);
    } else {
      return this.http.get(OWNERDB).pipe(
        map(response => {
          return {...response[id], id: id}
        })
      );
    }
  }

  getAllCenters(): Observable<any[]> {
    if(this.owners && this.owners.length > 0) {
      const centers = [];
      this.owners.map(owner => {
          centers.push(...owner.properties);
      })
      return of(centers);
    } else {
      return this.getAllOwners().pipe(
        map(owners => {
          const centers = [];
          owners.map(owner => {
              centers.push(...owner.properties);
          })
          return centers;
        })
      );
    }
  }

  getAllCentersByOwnerID(id: string): Observable<any[]> {
    if(this.owners && this.owners.length > 0) {
      const owner = this.owners.filter(owner => owner.id === id)[0];
      return of(owner.properties);
    } else {
      return this.getOwner(id).pipe(
        map(owner => owner.properties)
      );
    }
  }

  getCenterByOwnerIDName(id: string, name: string): Observable<Property> {
    if(this.owners && this.owners.length > 0) {
      const owner = this.owners.filter(owner => owner.id === id)[0];
      return of(owner.properties.filter(center => center.name === name)[0]);
    } else {
      return this.getOwner(id).pipe(
        map(owner => owner.properties),
        map(centers => centers.filter(center => center.name === name)[0])
      );
    }
  }

  getCenterByKeyword(keyword: string): Observable<any[]> {
    return this.getAllCenters().pipe(
      map(_response => {
        return _response.filter(res =>
          res.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
          res.address.city.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
          res.address.country.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        );
      })
    );
  }
}
