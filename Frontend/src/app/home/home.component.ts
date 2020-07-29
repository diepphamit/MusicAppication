import { Component, OnInit } from '@angular/core';

import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { SongService } from '../services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {
  itemsAsync: Observable<any[]>;
  total: any;
  showFirst;
  constructor(config: NgbCarouselConfig, private songService: SongService, private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.itemsAsync = this.songService.getAllSongs(6, 0)
                      .pipe(
                        tap(respone => this.total = respone.data.songs.total),
                        map(({data}) => data.songs.songs)
                        );

    this.itemsAsync.subscribe(data => { console.log(data); console.log(this.total); });

    this.addFavoriteSong('5f16863a0a67093742b0bf7d', 854914402);

  }

  addFavoriteSong(userId, songId) {
    this.songService.addFavoriteSongByUserId(userId, songId).subscribe(data => console.log('Add favorite song successfully'));
  }

}
