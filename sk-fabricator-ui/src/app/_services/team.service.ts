import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { TeamMember } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
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

  // Team
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.baseUrl}/team`)
      .pipe(catchError(err => this.handleError(err)));
  }

  addTeamMember(teamMemberData: FormData): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${this.baseUrl}/team`, teamMemberData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/team/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  addTeamMemberImage(imageData: FormData): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${this.baseUrl}/team/add-image`, imageData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  updateTeamMember(id: number, teamMemberData: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${this.baseUrl}/team/${id}`, teamMemberData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }
}
