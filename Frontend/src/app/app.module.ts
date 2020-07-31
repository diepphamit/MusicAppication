import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {StoreModule} from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {AlbumService} from './services/album.service';
import { SongService } from './services/song.service';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';



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
    GraphQLModule,
    BrowserAnimationsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    SongService, AlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
