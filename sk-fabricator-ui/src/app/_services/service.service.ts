import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Service } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private baseUrl = environment.apiUrl;

  constructor() { }

  // Helper to get headers
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }
    return headers;
  }

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

  // Services
  getServices(): Observable<Service[]> {
    if (!isPlatformBrowser(this.platformId)) {
      // During prerendering, return an empty observable to prevent API calls
      return of([]);
    }
    return this.http.get<Service[]>(`${this.baseUrl}/services`)
      .pipe(catchError(err => this.handleError(err)));
  }

  addService(serviceData: FormData): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/services`, serviceData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  updateService(serviceId: number, serviceData: any): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/services/${serviceId}`, serviceData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteService(serviceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/services/${serviceId}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  addServiceImage(imageData: FormData): Observable<Service> {
    return this.http.post<Service>(`${this.baseUrl}/services/image`, imageData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}
