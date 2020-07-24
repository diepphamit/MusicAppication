import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  storedTheme: string = localStorage.getItem('theme-color');
  title = 'music';
 
  ngOnInit() { }
  
  setTheme() {
    if (this.storedTheme === 'theme-dark') {
      localStorage.setItem('theme-color', 'theme-light');
      this.storedTheme = localStorage.getItem('theme-color');
    } else {
      localStorage.setItem('theme-color', 'theme-dark');
      this.storedTheme = localStorage.getItem('theme-color');
    }
  }

}
