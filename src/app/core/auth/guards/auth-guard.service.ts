import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// import { SocialAuthService, SocialUser } from 'angularx-social-login';
// import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { CognitoAuthService } from '../services/cognito/cognito.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // return this.socialAuthService.authState.pipe(
    //   map((socialUser: SocialUser) => !!socialUser),
    //   tap((isLoggedIn: boolean) => {
    //     if (!isLoggedIn) this.router.navigate(['login'])
    //   })
    // )
    return this.authService.isAuthenticated();
  }
}
