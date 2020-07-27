'use strict';

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable()
export class SongService {
  constructor(private apollo: Apollo) {
  }

  getAllSongs(pageSize, pageNumber): Observable<any> {
    const songsQuery = gql`query {
      songs(take:${pageSize}, skip:${pageNumber}){
        total,
        songs{
          id
        }
      }
     }`;

    return this.apollo.watchQuery({ query: songsQuery }).valueChanges;
  }

  addFavoriteSongByUserId(userId, songId): Observable<any> {
    const addFavoriteSongMutation = gql`mutation {
      addfavoriteSong(userId: "${userId}", songId: ${songId}){
        _id
      }
    }`;

    return this.apollo.mutate({ mutation: addFavoriteSongMutation });
  }
}

