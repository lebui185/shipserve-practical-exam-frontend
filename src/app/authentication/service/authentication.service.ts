import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environment/environment';
import { tap, shareReplay, catchError } from 'rxjs/operators';
import { LoggedInUser } from '@authentication';
import { LoginSuccessResponse } from '@authentication';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthenticationService {
  
  private loggedInUser: LoggedInUser;
  private token: string;

  private static readonly TOKEN_STORAGE_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  isAuthenticated(): boolean {
    return this.loggedInUser != null;
  }

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http
      .post<LoginSuccessResponse>(`${environment.serverApiUrl}/login`, formData)
      .pipe(
        tap((loginSuccessResponse: LoginSuccessResponse) => {
          this.loggedInUser = loginSuccessResponse.user;
          this.saveToken(loginSuccessResponse.token);
        })
      );
  }

  logout(): void {
    this.loggedInUser = null;
    this.clearToken();
  }

  private saveToken(token: string): void {
    this.token = token;
    this.localStorageService.store(AuthenticationService.TOKEN_STORAGE_KEY, token);
  }

  private clearToken(): void {
    this.token = null;
    this.localStorageService.clear(AuthenticationService.TOKEN_STORAGE_KEY);
  }

  private loadToken(): void {
    this.token = this.localStorageService.retrieve(AuthenticationService.TOKEN_STORAGE_KEY);
  }

  async loadCurrentUser(): Promise<any> {
    this.loadToken();
    return this.http.get<LoggedInUser>(`${environment.serverApiUrl}/logged-in-user`)
      .pipe(
        tap((user: LoggedInUser) => {
          this.loggedInUser = user;
        }),
        catchError(res => {
          this.clearToken();
          return of(res);
        })
      )
      .toPromise();
  }

  getLoggedInUser(): LoggedInUser {
    return this.loggedInUser;
  }

  getToken(): string {
    return this.token;
  }

  getUserCompanyId(): number {
    if (this.loggedInUser === null) {
      return null;
    }
    return this.loggedInUser.companyId;
  }

  hasAnyRoles(...inputRoles: string[]): boolean {
    for (const userRole of this.loggedInUser.roles) {
      for (const inputRole of inputRoles) {
        if (userRole === inputRole) {
          return true;
        }
      }
    }
    return false;
  }
}
