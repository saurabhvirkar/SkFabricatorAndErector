import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = environment.apiUrl;

  constructor() { }

  // Error handling helper
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

  // Newsletter
  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/newsletter/subscribe`, { email })
      .pipe(catchError(err => this.handleError(err)));
  }
}
