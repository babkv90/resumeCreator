import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface User {
  id: string;
  email: string;
  name: string;
  provider: string;
  picture?: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private refreshTokenTimeout?: any;
  private refreshingToken = false;
  private tokenRefreshInProgress?: Promise<string>;

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredSession();
  }

  private loadStoredSession() {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken && this.isTokenValid(accessToken)) {
        this.verifyToken(accessToken).subscribe();
      } else if (accessToken) {
        // Token exists but might be expired, try refresh
        this.refreshToken().subscribe({
          error: () => this.handleLogout()
        });
      }
    } catch (error) {
      console.error('Error loading stored session:', error);
      this.handleLogout();
    }
  }

  private verifyToken(token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/verify-token`, null, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      retry(1),
      tap((user: any) => {
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorized();
        }
        this.handleLogout();
        return throwError(() => error);
      })
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    try {
      if (!accessToken || !refreshToken) {
        throw new Error('Invalid tokens provided');
      }
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      this.verifyToken(accessToken).subscribe();
    } catch (error) {
      console.error('Error setting tokens:', error);
      this.handleLogout();
    }
  }

  getAccessToken(): string | null {
    try {
      const token = localStorage.getItem('access_token');
      return token && this.isTokenValid(token) ? token : null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  refreshToken(): Observable<any> {
    if (this.refreshingToken) {
      // Return existing refresh promise if one is in progress
      return new Observable(observer => {
        this.tokenRefreshInProgress?.then(
          token => {
            observer.next({ accessToken: token });
            observer.complete();
          },
          error => observer.error(error)
        );
      });
    }

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    this.refreshingToken = true;
    this.tokenRefreshInProgress = new Promise((resolve, reject) => {
      this.http.post<TokenResponse>(`${environment.apiUrl}/auth/refresh-token`, { refreshToken })
        .pipe(
          tap(tokens => {
            this.setTokens(tokens.accessToken, tokens.refreshToken);
            resolve(tokens.accessToken);
          }),
          catchError(error => {
            reject(error);
            this.handleLogout();
            return throwError(() => error);
          }),
          finalize(() => {
            this.refreshingToken = false;
            this.tokenRefreshInProgress = undefined;
          })
        ).subscribe();
    });

    return new Observable(observer => {
      this.tokenRefreshInProgress?.then(
        token => {
          observer.next({ accessToken: token });
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  private startRefreshTokenTimer() {
    try {
      this.stopRefreshTokenTimer();
      const token = this.getAccessToken();
      if (!token) return;

      const jwtToken = this.parseJwt(token);
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000); // 1 minute before expiry

      if (timeout > 0) {
        this.refreshTokenTimeout = setTimeout(() => {
          this.refreshToken().subscribe();
        }, timeout);
      } else {
        // Token is already expired or about to expire
        this.refreshToken().subscribe();
      }
    } catch (error) {
      console.error('Error starting refresh timer:', error);
      this.handleLogout();
    }
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = undefined;
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error parsing JWT:', error);
      throw error;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const jwtToken = this.parseJwt(token);
      const expires = new Date(jwtToken.exp * 1000);
      return expires.getTime() > Date.now();
    } catch {
      return false;
    }
  }

  private handleUnauthorized(): Observable<any> {
    return this.refreshToken().pipe(
      catchError(error => {
        this.handleLogout();
        return throwError(() => error);
      })
    );
  }

  private handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.stopRefreshTokenTimer();
    this.currentUserSubject.next(null);
  }

  logout() {
    // Attempt to notify server, but don't wait for response
    this.http.post(`${environment.apiUrl}/auth/logout`, {})
      .pipe(
        catchError(error => {
          console.error('Error during logout:', error);
          return of(null);
        })
      )
      .subscribe(() => this.handleLogout());
  }

  isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;
    const token = this.getAccessToken();
    return !!(user && token && this.isTokenValid(token));
  }
}