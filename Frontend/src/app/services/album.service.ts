
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

  
}