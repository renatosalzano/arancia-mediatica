import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../../local-storage/service/local-storage.service';
import { APP_ROUTE_LOGIN_PATH } from '../models/auth-path/auth-path.constants';
import { CognitoAuthService } from './cognito/cognito-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private cognitoAuthService: CognitoAuthService,
    private router: Router
  ) {}

  public login() {
    this.cognitoAuthService.federatedLogin();
  }

  public logout() {
    this.cognitoAuthService.logout();
  }

  public loginWithGoogle() {
    this.cognitoAuthService.federatedLogin();

    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then(
    //     (res: SocialUser) => {
    //       console.log('SOCIAL USER', res);
    //       if (res) this.localStorageService.setData(userDataKey, res);
    //       this.router.navigate(['home']);
    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       this.notificationService.error('Something went wrong with Google Sign In: ' + error, 3000);
    //     }
    //   );
  }

  public async isAuthenticated(
    redirectToLogin: boolean = true
  ): Promise<boolean | UrlTree> {
    const isAuthenticatedFn = () => this.cognitoAuthService.isAuthenticated();
    const authFailedFn = (resolve: (UrlTree) => void, reject: () => void) => {
      if (redirectToLogin) {
        //se autenticazione fallisce, puoi modificare qui la funzione
        console.info('AuthService', 'redirect to:', APP_ROUTE_LOGIN_PATH);
        resolve(this.router.parseUrl(APP_ROUTE_LOGIN_PATH));
      } else reject();
    };

    return new Promise<boolean>((resolve, reject) => {
      isAuthenticatedFn()
        .then((value) => {
          if (value) resolve(true);
          else authFailedFn(resolve, () => reject('Not Authenticated'));
        })
        .catch((error) => authFailedFn(resolve, () => reject(error)));
    });
  }
}
