import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RATINGDB } from '../config/dbconfig';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) {}

  getAllRatings() {
    return this.http.get(RATINGDB).pipe(
      map(response => {
        const ratings = [];
        for(let key in response) {
          ratings.push({...response[key], id: key});
        }
        return ratings;
      })
    );
  }
}
