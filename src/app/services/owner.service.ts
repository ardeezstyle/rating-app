import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OWNERDB, OWNERPATH } from '../config/dbconfig';
import { map } from 'rxjs/operators';
import { Owner, Property } from '../models/commons';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  owners: Owner[];

  constructor(private http: HttpClient) {}

  getAllOwners(): Observable<any[]> {
    if(this.owners && this.owners.length > 0) {
      return of(this.owners);
    } else {
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
        const props = owner.properties.map(prop => {
          return {...prop, owner_id: owner.id};
        })
        centers.push(...props);
      })
      return of(centers);
    } else {
      return this.getAllOwners().pipe(
        map(owners => {
          const centers = [];
          owners.map(owner => {
            const props = owner.properties.map(prop => {
              return {...prop, owner_id: owner.id};
            })
            centers.push(...props);
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
        map(owner => {
          return owner.properties;
        }),
        map(centers => (centers && centers.length > 0) ? centers.filter(cn => cn.name.trim() === name.trim())[0] : {})
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

  getOwnersAndPropertyCount() {
    return forkJoin(
      this.getAllOwners(),
      this.getAllCenters()
    ).pipe(
      map(response => {
        return {owner: response[0].length, property: response[1].length}
      })
    )

  }

  addProperty(props: Property[], owner_id: string) {
    return this.http.patch(OWNERPATH + '/' + owner_id + '.json', {properties: props});
  }

  addOwner(owner: Owner): Observable<any> {
    return this.http.post(OWNERDB, owner);
  }
}
