import { Injectable } from '@angular/core';
import { RSLOGIN } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  public static getUserId(): string {
    let ls: string;
    if(localStorage) {
      ls = localStorage.getItem(RSLOGIN);
    }

    return JSON.parse(ls).id;
  }

  public static getUserType(): string {
    let ls: string;
    if(localStorage) {
      ls = localStorage.getItem(RSLOGIN);
    }

    return JSON.parse(ls).type;
  }

  public static getAverageFromArray(array: number[] = [1, 2, 3]) {
    const len = array.length;
    const total = array.reduce((acc, cur) => acc+cur);
    return (total/len).toFixed(2);
  }
  
  public static getSumFromArray(array: number[] = [1, 2, 3]) {
    return array.reduce((acc, cur) => acc+cur);
  }
}
