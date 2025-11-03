import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = environment.apiUrl;

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
    return this.http.post<any>(`${this.baseUrl}/account/refresh`, {
      accessToken: accessToken,
      refreshToken: refreshToken
    }).pipe(
      tap((tokens: { token: string, refreshToken: string }) => {
        this.storeTokens(tokens.token, tokens.refreshToken);
      }),
      catchError(error => {
        this.logout(); // If refresh fails, log the user out
        return throwError(() => this.handleError(error));
      })
    );
  }

  login(credentials: any): Observable<{ token: string, refreshToken: string, email: string, role: string }> {
    return this.http.post<{ token: string, refreshToken: string, email: string, role: string }>(`${this.baseUrl}/account/login`, credentials).pipe(
      tap(response => {
        if (response && response.token && response.role) {
          if (isPlatformBrowser(this.platformId)) {
            this.storeTokens(response.token, response.refreshToken, response.role);
          }
          this.isLoggedInSubject.next(true);
          this.currentUserRoleSubject.next(response.role);
        }
      }),
      catchError(err => this.handleError(err))
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

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'Something went wrong; please try again later.';
    if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'string') {
      // Backend returned an error message as a string
      errorMessage = error.error;
    } else if (error.error && error.error.message) {
      // Backend returned an error object with a message property
      errorMessage = error.error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }
    return throwError(() => new Error(errorMessage));
  }
}