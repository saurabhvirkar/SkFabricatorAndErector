import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Project } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
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

  // Projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`)
      .pipe(catchError(err => this.handleError(err)));
  }

  addProject(projectData: FormData): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, projectData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  addProjectImage(imageData: FormData): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects/image`, imageData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${projectId}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  updateProject(projectId: number, projectData: any): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/projects/${projectId}`, projectData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}