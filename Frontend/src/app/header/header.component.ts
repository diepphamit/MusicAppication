import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user2 = null;
  isAuthentication = false;
  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {

    //  console.log(' poiuytrdsa ' + this.user2);
    this.user2 = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user2 !== null) {
      this.isAuthentication = true;
    }
   
  }
  Logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl('/');
    this.user2 = null;
    this.isAuthentication = false;

  }


}
