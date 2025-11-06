import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = environment.apiUrl;

  private getHeaders(isFormData: boolean = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'Something went wrong; please try again later.';
    if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.statusText) {
      errorMessage = error.statusText;
    }
    return throwError(() => new Error(errorMessage));
  }

  get<T>(endpoint: string): Observable<T> {
    if (!isPlatformBrowser(this.platformId)) {
      return of<T>([] as unknown as T);
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  post<T>(endpoint: string, data: any, isFormData: boolean = false): Observable<T> {
    const headers = this.getHeaders(isFormData);
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(err => this.handleError(err)));
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(catchError(err => this.handleError(err)));
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(catchError(err => this.handleError(err)));
  }
}
