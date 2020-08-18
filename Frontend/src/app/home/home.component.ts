import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
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
  //@ViewChildren('audio') audioElms :ElementRef[];
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
  allsongs:Observable<any[]>;
  firstName: string;
  notification = null;
  idisFavorite=0;
  searchText;

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
    this.getFavoriteSongs();

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
    this.albumAsync = this.albumService.getAllAlbums(100, 0)
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
  getFavoriteSongs() {
    this.fsongsAsync = this.songService.getFavoriteSongByUserId(this.user._id, 20, 0)
      .pipe(
        tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
        map(({ data }) => data.favoriteSongsByUser.songs)
      );
      this.fsongsAsync.subscribe(data=>{
        console.log("gfd");
        console.log(data);
      });
      
  }
  getarrayPageNumber(count) {
    return new Array(Math.ceil(count / 6));
  }
  addFavoriteSong(songId) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.songService.addFavoriteSongByUserId(this.user._id, songId).subscribe(data => {
      console.log('Add favorite song successfully');
      //this.router.navigate(['favoriteSong'], { queryParams: { added: 'true' } });
      this.showNotification();
     
    });
  }

  private currentPlayedElem: HTMLAudioElement = null;
  play = 0;

  onPaly(elm: HTMLAudioElement, id) {

    if (this.currentPlayedElem && this.currentPlayedElem !== elm) {
      this.currentPlayedElem.pause();

    }
    this.currentPlayedElem = elm;

    this.play = id;
  }

  onEnd(elm: HTMLAudioElement, id) {
    this.play = 0;
  }
  showNotification() {
    this.notification = { class: 'exploision', message: 'Added successfully', note: 'firework' }
    setTimeout(() => {
      this.notification = null;
    }, 2000);
  }



}


