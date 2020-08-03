'use strict';

import { Injectable } from '@angular/core';

import gql from 'graphql-tag';

import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';

@Injectable()
export class UserService {
  constructor(private apollo: Apollo) {
  }

 
  register(email, password): Observable<any> {
    const adduser = gql`mutation {
        signup(email: "${email}", password: "${password}"){
        _id,
         email,
         token
      }
    }`;

    return this.apollo.mutate({ mutation: adduser });
  }
}

