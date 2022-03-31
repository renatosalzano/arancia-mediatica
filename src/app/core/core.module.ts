import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2Guard } from './auth/guards/oauth2.guard';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { environment } from 'src/environments/environment';

import { AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { HttpClientModule } from '@angular/common/http';
import { Interactions } from '@aws-amplify/interactions';
import { Auth } from '@aws-amplify/auth';
import { ApiPrefixInterceptor } from './http/interceptors/api-mma.interceptor';
import { HttpService } from './http/services/http.service';
import { ErrorHandlerInterceptor } from './http/interceptors/error-handler.interceptor';
import { CacheInterceptor } from './http/interceptors/cache.interceptor';

export const httpInterceptors = [
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  CacheInterceptor,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    ...httpInterceptors,
    HttpService,
    Oauth2Guard,
    AuthGuardService,
    {
      provide: ApiPrefixInterceptor,
      useClass: ApiPrefixInterceptor,
    },
    {
      provide: AmplifyService,
      useFactory: () => AmplifyModules({ Auth, Storage, Interactions }),
    },
  ],
  exports: [],
})
export class CoreModule {}
