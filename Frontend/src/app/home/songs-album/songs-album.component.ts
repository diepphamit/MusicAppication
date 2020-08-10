import { Component, OnInit } from '@angular/core';

import { Track, MatAdvancedAudioPlayerComponent } from 'ngx-audio-player';

import { SongService } from 'src/app/services/song.service';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-songs-album',
  templateUrl: './songs-album.component.html',
  styleUrls: ['./songs-album.component.css']
})
export class SongsAlbumComponent implements OnInit {

  constructor(private songService: SongService, private apollo: Apollo) { }
  // playlist = [
  //   {
  //     title: 'Tha Kar ke',
  //     link: 'https://funksyou.com/fileDownload/Songs/128/13080.mp3'
  //   },
  //   {
  //     title: 'Golmal',
  //     link: 'https://funksyou.com/fileDownload/Songs/128/13091.mp3'
  //   }
  // ];
  playlist: Observable<any[]>;
  albumId;
  total: any;

  ngOnInit(): void {
    this.getSongsAlbum(103248);

  }
  getSongsAlbum(albumId) {
    this.playlist = this.songService.getSongsAlbum(albumId, 10, 0)
      .pipe(
        tap(respone => this.total = respone.data.songsAlbum.total),
        map(({ data }) => data.songsAlbum.songs)
      );

    this.playlist.subscribe(data => {
      console.log('hfgd');
      console.log(data);
    });
  }
}
