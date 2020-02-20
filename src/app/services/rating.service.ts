import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RATINGDB } from '../config/dbconfig';

import { map } from 'rxjs/operators';
import { Rating } from '../models/commons';
import { of } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public static Ratings: Rating[];
  public static OwnersRating: any;

  constructor(
    private http: HttpClient
  ) {}

  getAllRatings() {
    return this.http.get(RATINGDB).pipe(
      map(response => {
        const ratings: Rating[] = [];
        for(let key in response) {
          ratings.push({...response[key], id: key});
        }
        RatingService.Ratings = ratings;
        return ratings;
      })
    );
  }

  getAllRatingsByCustomer(cus_id: string) {
    if(RatingService.Ratings && RatingService.Ratings.length > 0) {
      return of(RatingService.Ratings.filter(rating => rating.user_id === cus_id))
    } else {
      return this.http.get(RATINGDB).pipe(
        map(response => {
          const ratings = [];
          for(let key in response) {
            if(response[key].user_id === cus_id){
              ratings.push({...response[key], id: key});
            }
          }
          return ratings;
        })
      );
    }
  }

  // Aggregated Ratings
  getAllRatingsByOwners() {
    if(RatingService.OwnersRating) {
      return of(RatingService.OwnersRating);
    } else {
      return this.http.get(RATINGDB).pipe(
        map(response => {
          const ratings = {};
          for(let key in response) {
            const ownerid = response[key]['owner_id'];

            if(ratings[ownerid]) {
              ratings[ownerid].push(response[key]);
            } else {
              ratings[ownerid] = [response[key]];
            }
          }
          return ratings;
        }),
        map(ratings => {
          const centerRatings = {};
          for(let key in ratings) {
            const centers = {};
            ratings[key].map(rating => {
              if(centers[rating.center]) {
                centers[rating.center].push(rating.rating);
              } else {
                centers[rating.center] = [rating.rating];
              }
            })
            centerRatings[key] = {...centers};
          }
          return centerRatings;
        }),
        map(ratings => {
          const ownerRatings = {};
          for(let owner in ratings) {
            let total = 0, count = 0, avg = 0;
            for(let center in ratings[owner]) {
              const array = ratings[owner][center];
              total += UtilitiesService.getSumFromArray(array);
              count += array.length;
              ratings[owner][center] = UtilitiesService.getAverageFromArray(array);
            }
            avg = +( total / count ).toFixed(2);
            ownerRatings[owner] = {...ratings[owner], avg: avg};
          }
          RatingService.OwnersRating = ownerRatings;
          return ownerRatings;
        })
      );
    }
  }



  getAllRatingsByOwner(owner_id: string) {
    if(RatingService.Ratings && RatingService.Ratings.length > 0) {
      return of(RatingService.Ratings.filter(rating => rating.user_id === owner_id))
    } else {
      return this.http.get(RATINGDB).pipe(
        map(response => {
          const ratings = [];
          for(let key in response) {
            if(response[key].owner_id === owner_id){
              ratings.push({...response[key], id: key});
            }
          }
          return ratings;
        })
      );
    }

  }

  getAggregatedRatingsByOwner(owner_id: string) {
    if(RatingService.OwnersRating) {
      return of(RatingService.OwnersRating[owner_id]);
    } else {
      return this.getAllRatingsByOwners().pipe(
        map(response => response[owner_id])
      );
    }

  }

  rateProgram(rating: Rating) {
    return this.http.post(RATINGDB, rating);
  }
}
