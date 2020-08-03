import { Component, OnInit,Input } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   albumAsync: Observable<any[]>;
   total;
  constructor(private albumService:AlbumService,private apollo:Apollo) { }

  ngOnInit(): void {
    this.getAllAlbums();
  }
  getAllAlbums() {
    this.albumAsync = this.albumService.getAllAlbums(100, 0)
      .pipe(
        tap(respone => this.total = respone.data.albums.total),
        map(({ data }) => data.albums.albums)
      );

  

  }

}
