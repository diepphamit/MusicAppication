'use strict';

import { Injectable } from '@angular/core';

import gql from 'graphql-tag';

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
          id,
          title_short,
          preview,
          rank
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

  getFavoriteSongByUserId(userId,pageSize, pageNumber): Observable<any>{
    const fsongs=gql`query{
      favoriteSongsByUser(userId:"${userId}",take:${pageSize},skip:${pageNumber}){
        total,
        songs{
          id,
          link,
          title_short,
          preview,
          rank,
        }
        
      }
    }`;
    return this.apollo.watchQuery({ query: fsongs }).valueChanges;
  }
  getSongsAlbum(albumId,pageSize, pageNumber): Observable<any>{
    const sA=gql`query{
      songsAlbum(userId:"${albumId}",take:${pageSize},skip:${pageNumber}){
        total,
        songs{
          id,
          link,
          title_short,
          preview,
          rank,
        }
        
      }
    }`;
    return this.apollo.watchQuery({ query: sA }).valueChanges;
  }

 
}

