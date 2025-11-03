import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SectionImage } from '../_models/section-image.model';

@Injectable({
  providedIn: 'root'
})
export class SectionImageService {
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

  // Section Images
  getSectionImage(section: string): Observable<SectionImage> {
    return this.http.get<SectionImage>(`${this.baseUrl}/section-image/${section}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  getSectionImagesBySectionName(sectionName: string): Observable<SectionImage[]> {
    return this.http.get<SectionImage[]>(`${this.baseUrl}/section-image/${sectionName}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  uploadSectionImage(imageData: FormData, sectionName: string): Observable<SectionImage> {
    imageData.append('sectionName', sectionName);
    return this.http.post<SectionImage>(`${this.baseUrl}/section-image/add-image`, imageData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteSectionImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/section-image/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}
