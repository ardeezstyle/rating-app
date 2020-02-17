import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPES } from 'src/app/config/enums.enum';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(res => {
      console.log("Redirect to the correct user based on response");

      switch(res.user.type) {
        case USER_TYPES.ADMIN: {
          this.router.navigate(['admin'], {relativeTo: this.route});
          break;
        }
        case USER_TYPES.OWNER: {
          this.router.navigate(['owner'], {relativeTo: this.route} );
          break;
        }
        case USER_TYPES.CUSTOMER: {
          this.router.navigate(['customer'], {relativeTo: this.route} );
          break;
        }
      }
    });
  }

}
