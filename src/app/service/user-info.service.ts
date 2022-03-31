import { Injectable, OnInit } from '@angular/core';
import { CognitoAuthService } from '../core/auth/services/cognito/cognito-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService implements OnInit {
  public user: { [key: string]: string } = {};

  constructor(private cognito: CognitoAuthService) {}

  ngOnInit(): void {}

  async getUserInfo() {}

  public userId() {
    return this.user['id'];
  }

  public getToken() {
    return this.user['token'];
  }
}
