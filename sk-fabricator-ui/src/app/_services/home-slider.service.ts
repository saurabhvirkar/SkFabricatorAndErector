import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HomeSlider } from '../_models/home-slider.model';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {
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

  // Home Slider
  getHomeSliders(): Observable<HomeSlider[]> {
    return this.http.get<HomeSlider[]>(`${this.baseUrl}/home-slider`)
      .pipe(catchError(err => this.handleError(err)));
  }

  addHomeSlider(homeSliderData: { title: string, description: string }): Observable<HomeSlider> {
    return this.http.post(`${this.baseUrl}/home-slider`, homeSliderData, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(
        map(response => JSON.parse(response) as HomeSlider),
        catchError(err => this.handleError(err))
      );
  }

  addHomeSliderImage(imageData: FormData): Observable<HomeSlider> {
    return this.http.post(`${this.baseUrl}/home-slider/add-image`, imageData, { headers: this.getHeaders(), responseType: 'text' })
      .pipe(
        map(response => JSON.parse(response) as HomeSlider),
        catchError(err => this.handleError(err))
      );
  }

  updateHomeSlider(id: number, homeSliderData: { title: string, description: string }): Observable<HomeSlider> {
    return this.http.put<HomeSlider>(`${this.baseUrl}/home-slider/${id}`, homeSliderData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteHomeSlider(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/home-slider/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}
