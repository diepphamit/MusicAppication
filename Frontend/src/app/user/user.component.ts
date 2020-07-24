import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clinkon() {
    console.log('ưddsf');
    this.router.navigate(['/login']).then(data => console.log(data));
  }

}
