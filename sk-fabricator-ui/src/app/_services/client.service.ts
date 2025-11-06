import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ClientDetails } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
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

  // Clients
  getClientDetails(): Observable<ClientDetails[]> {
    if (!isPlatformBrowser(this.platformId)) {
      // During prerendering, return an empty observable to prevent API calls
      return of([]);
    }
    return this.http.get<ClientDetails[]>(`${this.baseUrl}/clients`)
      .pipe(catchError(err => this.handleError(err)));
  }

  addClient(clientData: FormData): Observable<ClientDetails> {
    return this.http.post<ClientDetails>(`${this.baseUrl}/clients`, clientData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/clients/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  addClientImage(imageData: FormData): Observable<ClientDetails> {
    return this.http.post<ClientDetails>(`${this.baseUrl}/clients/add-image`, imageData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  updateClient(id: number, clientData: ClientDetails): Observable<ClientDetails> {
    return this.http.put<ClientDetails>(`${this.baseUrl}/clients/${id}`, clientData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}
