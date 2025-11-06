import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserRoleSubject = new BehaviorSubject<string | null>(this.getRole());
  public currentUserRole$ = this.currentUserRoleSubject.asObservable();

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('jwt_token');
    }
    return false;
  }

  private getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user_role');
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  refreshToken(): Observable<any> {
    const accessToken = this.getToken();
    const refreshToken = this.getRefreshToken();
    if (!accessToken || !refreshToken) {
      return throwError(() => new Error('Missing tokens for refresh'));
    }
    return this.apiService.post<any>('account/refresh', {
      accessToken: accessToken,
      refreshToken: refreshToken
    }).pipe(
      tap((tokens: { token: string, refreshToken: string }) => {
        this.storeTokens(tokens.token, tokens.refreshToken);
      }),
      catchError(error => {
        this.logout(); // If refresh fails, log the user out
        return throwError(() => error);
      })
    );
  }

  login(credentials: any): Observable<{ token: string, refreshToken: string, email: string, role: string }> {
    return this.apiService.post<{ token: string, refreshToken: string, email: string, role: string }>('account/login', credentials).pipe(
      tap(response => {
        if (response && response.token && response.role) {
          if (isPlatformBrowser(this.platformId)) {
            this.storeTokens(response.token, response.refreshToken, response.role);
          }
          this.isLoggedInSubject.next(true);
          this.currentUserRoleSubject.next(response.role);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
    }
    this.isLoggedInSubject.next(false);
    this.currentUserRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  private storeTokens(accessToken: string, refreshToken: string, role?: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwt_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      if (role) {
        localStorage.setItem('user_role', role);
      }
    }
  }
}