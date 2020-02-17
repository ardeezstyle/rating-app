import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OWNERDB } from '../config/dbconfig';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) {}

  getAllOwners() {
    return this.http.get(OWNERDB).pipe(
      map(response => {
        const owners = [];
        for(let key in response) {
          owners.push({...response[key], id: key});
        }
        return owners;
      })
    );
  }

  getOwner(id: string) {
    return this.http.get(OWNERDB).pipe(
      map(response => {
        return {...response[id], id: id}
      })
    );
  }
}
