import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSessionService } from '../../user-session/service/user-session.service';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private userSessionService: UserSessionService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf(environment.apiGwBaseEndpoint) !== -1) {
      const idToken = this.userSessionService.getAuthToken()['jwtToken'];
      let headers = req.headers.set('Authorization', `Bearer ${idToken}`);

      if (
        req.method.toLocaleLowerCase() == 'post' &&
        req.body['data']['file']
      ) {
        headers = headers.set('Content-Type', 'multipart/form-data');
      }

      req = req.clone({
        headers,
      });
    }

    return next.handle(req);
  }
}
