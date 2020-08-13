import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { SongService } from 'src/app/services/song.service';


@Component({
  selector: 'app-favorite-songs',
  templateUrl: './favorite-songs.component.html',
  styleUrls: ['./favorite-songs.component.css']
})
export class FavoriteSongsComponent implements OnInit {
  fsongsAsync: Observable<any[]>;
  user;
  totalfs=0;
  message;
 
  constructor(private apollo: Apollo, private router: Router, private routeParam: ActivatedRoute, private songService: SongService) {
   
  }
  public activeElement = 0;
  public selectedItem(id) {
    this.activeElement = id;
  }

  ngOnInit(): void {
    this.routeParam.queryParams.subscribe(params => {
      if (params.added !== undefined && params.added === 'true') {
        console.log(params.added);
        this.message = ' Added Successfully';
      }
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.getFavoriteSongs();
  }
  getFavoriteSongs() {
    this.fsongsAsync = this.songService.getFavoriteSongByUserId(this.user._id, 4, 0)
      .pipe(
        tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
        map(({ data }) => data.favoriteSongsByUser.songs)
      );
    this.fsongsAsync.subscribe(data => {

    });

  }
  getFavoriteSongsPagination(number) {
    this.fsongsAsync = this.songService.getFavoriteSongByUserId(this.user._id, 4, number)
      .pipe(
        tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
        map(({ data }) => data.favoriteSongsByUser.songs)
      );
    this.fsongsAsync.subscribe(data => {
     

    });

  }
  getarrayPageNumber(count) {
    return new Array(Math.ceil(count / 4));
  }
}
