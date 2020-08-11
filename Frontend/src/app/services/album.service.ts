
'use strict';

import { Injectable } from '@angular/core';

import gql from 'graphql-tag';

import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';

@Injectable()
export class AlbumService {
  constructor(private apollo: Apollo) {
  }

  getAllAlbums(pageSize, pageNumber): Observable<any> {
    const albumsQuery = gql`query{
        albums(take:${pageSize},skip:${pageNumber}){
          total
          albums{
            id,
            title,
            cover_medium,
            albumId,
            cover_small,
            
          }
        }
      }`;

    return this.apollo.watchQuery({ query: albumsQuery }).valueChanges;
  }
  getSongsAlbum(albumId,pageSize, pageNumber): Observable<any>{
    const songsA=gql`query{
      songsAlbum(albumId:${albumId},take:${pageSize},skip:${pageNumber}){
        total,
        songs{
          title_short,
          preview,
         
        }
      }
    }`;
    return this.apollo.watchQuery({ query: songsA }).valueChanges;
  }

  
}