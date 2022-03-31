import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSessionService } from '../../user-session/service/user-session.service';


/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    private userSessionService: UserSessionService
  ) {}


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let newRequest;
    console.log('INTERCEPETED REQUEST', request);
    if (request.url.indexOf('jokes') !== -1) {
      
      const headers = request.headers
      .set("accept", "application/json")
      .set("x-rapidapi-host", "matchilling-chuck-norris-jokes-v1.p.rapidapi.com")
      .set("x-rapidapi-key", environment.chuckNorrisJokesApiKey)

      request = request.clone(
        { 
          url: environment.chuckNorrisJokesApiPrefix + request.url,
          headers: headers
        }
      );
    }

    if (request.url.indexOf(environment.apiGwBaseEndpoint) !== -1) {
      const idToken = this.userSessionService.getAuthToken()['jwtToken'];
      let headers = request.headers
      .set("Authorization", `Bearer ${idToken}`)

      if (request.method.toLocaleLowerCase() == 'post' && request.body['data']['file']) {
        headers = headers.set('Content-Type', 'multipart/form-data')
      }

      request = request.clone(
        { 
          headers
        }
      );

    }
    
    if (request.url.indexOf('i18n') === -1) {
      if (!/^(http|https):/i.test(request.url)) {
        console.log('INTERCEPETED REQUEST', request);
        // if (request.url.indexOf('CmsService') > -1) {
        //   request = request.clone({url: environment.cmsApiUrl + request.url});
        // } else if (request.url.indexOf('HelpService') > -1 || request.url.indexOf('DataServices') > -1) {
        //   request = request.clone({url: environment.cmsBEApiUrl + request.url});

        // } else {
        //   request = request.clone({url: environment.omegaApiUrl + request.url});

        // }

      }
    }
    console.log('INTERCEPTED REQUEST TRANSFORMED', request);

    return next.handle(request);
  }
}
