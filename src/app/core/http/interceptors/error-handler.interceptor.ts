import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let errors: any[];
        errors = [];
        const errorText = err.error
          ? err.error.error_description || err.statusText
          : '';

        if (err.status === 401) {
          // Auto logout if 401 response returned from api
          // this.authService.startAuthentication();
          // location.reload(true);
        }
        if (err.status === 400) {
          return throwError(errorText);
          // this.notificationService.error(
          //   this.handleErrorDescription(errorText)
          // );
        }
        if (err.status === 500) {
          // get(err, 'error.exception.errors', [
          //   {
          //     code: 'generic error',
          //     description: 'error',
          //   },
          // ]).forEach((error: any) => {
          //   if (error.code !== 'DuplicateUserName') {
          //     errors.push(error);
          //   }
          // });
          return throwError(errors);
        }

        this.notificationService.error('Error');
        return throwError(err);
      })
    );
  }
}
