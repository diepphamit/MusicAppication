import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { DialogComponent } from '../dialog/dialog.component';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {
  itemsAsync: Observable<any[]>;
  albumAsync: Observable<any[]>;
  total: any;
  totalalbum;
  showFirst;


  constructor(config: NgbCarouselConfig, private songService: SongService, private apollo: Apollo, private albumService: AlbumService,public dialog: MatDialog) {

  }
  public activeElement = 0;
  public selectedItem(id) {
    this.activeElement = id;
  }

  ngOnInit(): void {
    this.getListSongs();
    this.getAllAlbums();

    this.addFavoriteSong('5f16863a0a67093742b0bf7d', 854914402);

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

    this.itemsAsync.subscribe(data => {
      console.log(data); console.log(this.total);

    });



  }

  getAllAlbums() {
    this.albumAsync = this.albumService.getAllAlbums(4, 0)
      .pipe(
        tap(respone => this.total = respone.data.albums.total),
        map(({ data }) => data.albums.albums)
      );

    this.albumAsync.subscribe(data => {
     
      console.log(data);
       console.log(this.total);
    });
    console.log('bgjhhhhhhhhhhhhhj');
    console.log(this.total);
  }
  getListSongsPagination(number) {
    this.itemsAsync = this.songService.getAllSongs(6, number)
      .pipe(
        tap(respone => this.total = respone.data.songs.total),
        map(({ data }) => data.songs.songs)
      );

    this.itemsAsync.subscribe(data => {
      console.log(data);

    });


  }
  getarrayPageNumber(count) {
    return new Array(Math.ceil(count / 6));
  }

  addFavoriteSong(userId, songId) {
    this.songService.addFavoriteSongByUserId(userId, songId).subscribe(data => console.log('Add favorite song successfully'));
  }

}


