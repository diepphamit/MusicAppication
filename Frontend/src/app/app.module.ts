import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {StoreModule} from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';  
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    UserComponent,
    HomeComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
