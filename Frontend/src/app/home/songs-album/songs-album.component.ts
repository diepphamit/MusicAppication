import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Track, MatAdvancedAudioPlayerComponent } from 'ngx-audio-player';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AlbumService } from 'src/app/services/album.service';
export interface Type {
  title: string;
  link: string;
}
@Component({
  selector: 'app-songs-album',
  templateUrl: './songs-album.component.html',
  styleUrls: ['./songs-album.component.css']
})

export class SongsAlbumComponent implements OnInit {
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 3, 4];
  msaapDisplayVolumeControls = true;
  songsAlbum: Observable<any[]>;
  albumId;
  title;
  picture;
  total: any;

  // playlist:Track[]=[
  //   {
  //     title:"ghkf",
  //     link:"https://cdns-preview-d.dzcdn.net/stream/c-d619abeefacbb0200980b100f3a6d094-9.mp3"
  //   },
  //   {
  //     title:"ghkf",
  //     link:"https://cdns-preview-c.dzcdn.net/stream/c-cb8d553b1c93f02ac8f38d5278b0a9e7-9.mp3"
  //   }
  // ]

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private albumService: AlbumService, private apollo: Apollo) {
    this.albumId = this.activatedRoute.snapshot.params.id;
    this.title = this.activatedRoute.snapshot.params.title;
    this.picture = this.activatedRoute.snapshot.params.picture;
    this.getSongsAlbum(this.albumId);

  }
  ngOnInit(): void {
    console.log(this.picture);
    this.getSongsAlbum(this.albumId);

  }
  playlist: Track[] = [];
  getSongsAlbum(albumId) {

    this.songsAlbum = this.albumService.getSongsAlbum(albumId, 100, 0)
      .pipe(
        tap(respone => this.total = respone.data.songsAlbum.total),
        map(({ data }) => data.songsAlbum.songs),
      );

    this.songsAlbum.subscribe(data => {
      console.log(data);
      for (const item of data) {
        this.playlist.push({
          title: item.title_short,
          link: item.preview
        });
      }
      console.log(this.playlist);
    });

  }

}
