import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { AuthenticationGuard } from './guard/authentication.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateRequestInterceptor } from './interceptor/authenticate-request-interceptor';
import { LoginGuard } from './guard/login.guard';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateRequestInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authenticationService: AuthenticationService) => () => authenticationService.loadCurrentUser(),
      deps: [AuthenticationService],
      multi: true
    },
  ],
})
export class AuthenticationModule {}
