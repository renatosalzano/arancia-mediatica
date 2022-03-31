import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ConsoleLogger } from '@aws-amplify/core';
import { Observable } from 'rxjs';
import {
  APP_ROUTE_HOME_PATH,
  APP_ROUTE_LOGIN_PATH,
} from '../models/auth-path/auth-path.constants';
import { AuthService } from '../services/auth.service';
// import { CognitoAuthService } from '../services/cognito/cognito-auth.service';

@Injectable({
  providedIn: 'root',
})
export class Oauth2Guard implements CanActivate {
  constructor(
    // private cognitoAuthService: CognitoAuthService,
    private authService: AuthService,
    private router: Router
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      console.info('Oauth2Guard', 'kicked with url:', location.href);
      console.log('STATE URL', state.url);
      // redirect with access/id token
      if (state.url === '/access_token' || state.url === '/id_token') {
        this.authService
          .isAuthenticated(false)
          .then((value) => {
            console.log('VALUE', value);
            this.router.navigate([APP_ROUTE_HOME_PATH]);
          })
          .catch((reason) => {
            console.error('Oauth2Guard', 'ERROR', reason);
            this.router.navigate([APP_ROUTE_LOGIN_PATH]);
          });
      }
    });
  }
}
