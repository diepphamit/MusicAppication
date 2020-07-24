import { Component, OnInit } from '@angular/core';

import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {
 
  constructor(config: NgbCarouselConfig) { 
  
  }

  ngOnInit(): void {
  }

}
