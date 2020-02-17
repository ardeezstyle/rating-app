import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  isAdmin: boolean;
  isOwner: boolean;
  isCustomer: boolean;
  isUnauthorized: boolean;

  constructor(private as: AuthService, private router: Router) { }



  ngOnInit() {
    this.router.events.subscribe((val) => {
        // see also
        if(val instanceof NavigationEnd) {
          this.isAdmin = this.as.isAdmin();
          this.isOwner = this.as.isOwner();
          this.isCustomer = this.as.isCustomer();
          this.isUnauthorized = !this.as.isAuthorised();


          console.log('this.isAdmin', this.isAdmin);
          console.log('this.isOwner', this.isOwner);
          console.log('this.isCustomer', this.isCustomer);
          console.log('this.isUnauthorized', this.isUnauthorized);
        }
    });


  }

  ngOnChanges() {

  }


  logout() {
    console.log('Logout button clicked');
    this.as.logout();
  }
}
