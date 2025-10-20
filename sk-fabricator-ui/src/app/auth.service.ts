import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserRoleSubject = new BehaviorSubject<string | null>(this.getRole());
  public currentUserRole$ = this.currentUserRoleSubject.asObservable();

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }

  private getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user_role');
    }
    return null;
  }

  login(credentials: any): Observable<{ success: boolean; message: string; token?: string; role?: string }> {
    return this.apiService.adminLogin(credentials).pipe(
      tap(response => {
        if (response.success && response.token && response.role) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('user_role', response.role);
          }
          this.isLoggedInSubject.next(true);
          this.currentUserRoleSubject.next(response.role);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
    }
    this.isLoggedInSubject.next(false);
    this.currentUserRoleSubject.next(null);
    // Optionally, navigate to the home page or login page
  }
}