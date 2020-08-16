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
  msaapPageSizeOptions = [ 2, 3, 4];
  msaapDisplayVolumeControls = true;
  songsAlbum: Observable<any[]>;
  albumId;
  title;
  picture;
  total: any;
  playlist: Track[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private albumService: AlbumService, private apollo: Apollo) {
    this.albumId = this.activatedRoute.snapshot.params.id;
    this.title = this.activatedRoute.snapshot.params.title;
    this.picture = this.activatedRoute.snapshot.params.picture;

  }
  ngOnInit(): void {
    console.log(this.picture);
    this.getSongsAlbum(this.albumId);

  }

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
