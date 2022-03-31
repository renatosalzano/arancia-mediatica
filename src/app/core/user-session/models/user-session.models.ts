import { SocialUser } from 'angularx-social-login';

export interface UserData {
  user_id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  picture?: string;
}

export interface GoogleAuthToken {
  access_token: string;
  expires_at: number;
  expires_in: number;
  first_issued_at: number;
  id_token: string;
  idpId: string;
  login_hint: string;
  scope: string;
  session_state: any;
  token_type: string;
}

export interface CognitoAuthToken {
  idToken: string;
  accessToken: string;
  expiresOn: any;
}

export class AuthToken {
  public accessToken: string;
  public expiresAt: number;
  public expiresIn: number;
  public idToken: string;

  constructor(
    googleAuthToken?: GoogleAuthToken,
    cognitoAuthToken?: CognitoAuthToken
  ) {
    if (googleAuthToken) {
      this.idToken = googleAuthToken.id_token;
      this.accessToken = googleAuthToken.access_token;
      this.expiresAt = googleAuthToken.expires_at;
      this.expiresIn = googleAuthToken.expires_in;
    }

    if (cognitoAuthToken) {
      this.accessToken = cognitoAuthToken.accessToken;
      this.idToken = cognitoAuthToken.idToken;
      this.expiresAt = cognitoAuthToken.expiresOn;
    }
  }
}
