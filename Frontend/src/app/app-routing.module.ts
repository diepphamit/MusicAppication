import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SongsAlbumComponent } from './home/songs-album/songs-album.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: '', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'songsAlbum/:id/:title/:picture', component: SongsAlbumComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
