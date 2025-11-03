import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { GalleryImage } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
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

  // Gallery
  getPhotos(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.baseUrl}/gallery`)
      .pipe(catchError(err => this.handleError(err)));
  }

  getImages(filter: string): Observable<GalleryImage[]> {
    let url = `${this.baseUrl}/gallery`;
    if (filter !== 'All') {
      url += `?category=${filter}`;
    }
    return this.http.get<GalleryImage[]>(url)
      .pipe(catchError(err => this.handleError(err)));
  }

  uploadImage(formData: FormData, category: string, isAboutSlider: boolean): Observable<GalleryImage> {
    formData.append('category', category);
    formData.append('isAboutSlider', isAboutSlider.toString());
    return this.http.post<GalleryImage>(`${this.baseUrl}/gallery/add-photo`, formData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/gallery/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}
