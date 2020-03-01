import { Injectable } from '@angular/core';
import CENTERS from '../../mock/data-centers.json';

import PROGRAMS from '../../mock/data-program.json';

@Injectable({
  providedIn: 'root'
})
export class CentersService {

  constructor() {}

  getCenterSeats(center: string) {
    let
      total = 0,
      occupied = 0,
      vacant = 0;

    this.getProgramsByCenter(center).map(pro => {
      total += pro.total;
      occupied += pro.occupied;
      vacant += pro.vacant;
    })
    return {
      total: total,
      occupied: occupied,
      vacant: vacant
    }
  }

  getAllSeats() {
    const centers = CENTERS.slice();
    const AllCenters = [];

    centers.map((center: any) => {
      const seats = this.getCenterSeats(center.center);
      AllCenters.push({
        ...center,
        total_customers: seats.total,
        current_customers: seats.occupied,
        vacancy: seats.vacant,
      });
    })

    return AllCenters;
  }

  getAllSeatsCount() {
    let
      total = 0,
      occupied = 0,
      vacant = 0;

    this.getAllSeats().map((center: any) => {
      total += center.total_customers;
      occupied += center.current_customers;
      vacant += center.vacancy;
    })
    return {
      total: total,
      occupied: occupied,
      vacant: vacant
    }
  }

  getAllCenters() {
    return this.getAllSeats();
  }

  getCenter(id: string) {
    return this.getAllCenters().find((center: any) => center.id === id);
  }

  // All programs from all centers
  getPrograms() {
    const programs = [];
    const progObject = {};

    PROGRAMS.map(prog => {
      if(progObject[prog.name]) {
        let oc = progObject[prog.name].occupied;
        let tot = progObject[prog.name].total;
        let vac = progObject[prog.name].vacant;
        let vis = progObject[prog.name].total_visits;

        progObject[prog.name] = {
          occupied: oc + prog.occupied,
          total: tot + prog.total,
          vacant: vac + prog.vacant,
          total_visits: vis + prog.total_visits
        }
      } else {
        progObject[prog.name] = {
          occupied: prog.occupied,
          total: prog.total,
          vacant: prog.vacant,
          total_visits: prog.total_visits
        }
      }
    })
    Object.keys(progObject).map((key: string) => {
      programs.push({ ...progObject[key], program: key});
    })

    return programs;
  }

  // All programs from a center
  getProgramsByCenter(center: string) {
    const programs = [];
    const progObject = {};

    PROGRAMS.map(prog => {
      if(center && prog.center === center) {
        if(progObject[prog.name]) {
          let oc = progObject[prog.name].occupied;
          let tot = progObject[prog.name].total;
          let vac = progObject[prog.name].vacant;
          let vis = progObject[prog.name].total_visits;

          progObject[prog.name] = {
            occupied: oc + prog.occupied,
            total: tot + prog.total,
            vacant: vac + prog.vacant,
            total_visits: vis + prog.total_visits
          }
        } else {
          progObject[prog.name] = {
            occupied: prog.occupied,
            total: prog.total,
            vacant: prog.vacant,
            total_visits: prog.total_visits
          }
        }
      }
    });

    Object.keys(progObject).map((key: string) => {
      programs.push({ ...progObject[key], program: key});
    });

    return programs;
  }


}
