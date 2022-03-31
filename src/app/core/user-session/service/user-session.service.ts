import { Injectable } from '@angular/core';
import { CognitoIdToken, CognitoUserSession } from 'amazon-cognito-identity-js';
import {
  authTokenKey,
  userDataKey,
} from '../../local-storage/constants/storage-keys.constants';
import { LocalStorageService } from '../../local-storage/service/local-storage.service';
import { AuthToken, UserData } from '../models/user-session.models';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  constructor(private localStorageService: LocalStorageService) {}

  public setSessionData(res) {
    const userSessionData: CognitoUserSession = res;
    const userData: UserData = {
      user_id: userSessionData.getIdToken().payload['custom:user_id'],
      username: userSessionData.getIdToken().payload['cognito:username'],
      name: userSessionData.getIdToken().payload['given_name'],
      surname: userSessionData.getIdToken().payload['family_name'],
      email: userSessionData.getIdToken().payload['email'],
      picture: userSessionData.getIdToken().payload['picture'],
    };
    console.log('RES', res);
    this.localStorageService.setData(userDataKey, userData);
    this.setAuthToken(userSessionData);
  }

  public getAuthToken(): CognitoIdToken {
    return this.localStorageService.getData(authTokenKey);
  }

  public getUserData(): UserData {
    return this.localStorageService.getData(userDataKey);
  }

  private setAuthToken(userSession: CognitoUserSession): void {
    if (userSession && userSession.getIdToken()) {
      //const authToken: AuthToken = new AuthToken(userData.response);
      const authToken = userSession.getIdToken();
      this.localStorageService.setData(authTokenKey, authToken);
    }
  }
}
