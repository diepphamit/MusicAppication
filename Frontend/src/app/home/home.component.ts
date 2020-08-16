import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { DialogComponent } from '../dialog/dialog.component';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig, NgbPopoverConfig]  // add NgbCarouselConfig to the component providers
}
)
export class HomeComponent implements OnInit {
  //@ViewChild('audio', { static: true }) audioElms: ElementRef;

  currentpage = 1;
  itemsAsync: Observable<any[]>;
  albumAsync: Observable<any[]>;
  total = 0;
  totalalbum;
  totalfs;
  showFirst;
  user = null;
  islogin = false;
  fsongsAsync: Observable<any[]>;
  firstName: string;

  constructor(config: NgbPopoverConfig, private songService: SongService, private apollo: Apollo, private albumService: AlbumService, public dialog: MatDialog, private sanitize: DomSanitizer, private routeParam: ActivatedRoute, private router: Router) {
    config.placement = 'top';

  }
  public activeElement = 0;
  public selectedItem(id) {
    this.activeElement = id;
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.getListSongs();
    this.getAllAlbums();
    if (this.user !== null) {
      this.islogin = true;
    }
    // this.addFavoriteSong();

  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getListSongs() {
    this.itemsAsync = this.songService.getAllSongs(6, 0)
      .pipe(
        tap(respone => this.total = respone.data.songs.total),
        map(({ data }) => data.songs.songs)
      );
  }

  getAllAlbums() {
    this.albumAsync = this.albumService.getAllAlbums(4, 0)
      .pipe(
        tap(respone => this.total = respone.data.albums.total),
        map(({ data }) => data.albums.albums)
      );
  }
  getListSongsPagination(number) {
    this.itemsAsync = this.songService.getAllSongs(6, number)
      .pipe(
        tap(respone => this.total = respone.data.songs.total),
        map(({ data }) => data.songs.songs)
      );


  }
  // getFavoriteSongs(userId) {
  //   this.fsongsAsync = this.songService.getFavoriteSongByUserId(userId, 20, 0)
  //     .pipe(
  //       tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
  //       map(({ data }) => data.favoriteSongsByUser.songs)
  //     );
  // }
  getarrayPageNumber(count) {
    return new Array(Math.ceil(count / 6));
  }
  addFavoriteSong(songId) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.songService.addFavoriteSongByUserId(this.user._id, songId).subscribe(data => {
      console.log('Add favorite song successfully');
      this.router.navigate(['favoriteSong'], { queryParams: { added: 'true' } });
      //this.getFavoriteSongs('5f2905d08f14d320e83bd9f9');
      // this.fsongsAsync = this.songService.getFavoriteSongByUserId(userId, 20, 0)
      //   .pipe(
      //     tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
      //     map(({ data }) => data.favoriteSongsByUser.songs)
      //   );
    });
  }





}


