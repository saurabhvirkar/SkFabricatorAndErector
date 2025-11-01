import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from './environments/environment';
import { Inquiry } from './_models/inquiry.model';
import { Service } from './_models/data.model';
import { Project } from './_models/data.model';
import { TeamMember } from './_models/data.model';
import { ClientDetails } from './_models/data.model';
import { GalleryImage } from './_models/data.model';
import { SectionImage } from './_models/section-image.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  // Methods for each feature

  // Inquiries
  getInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.baseUrl}/inquiry`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteInquiry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/inquiry/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  submitInquiry(inquiryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inquiry`, inquiryData)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Services
  getServices(): Observable<Service[]> {
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

  // Clients
  getClientDetails(): Observable<ClientDetails[]> {
    return this.http.get<ClientDetails[]>(`${this.baseUrl}/clients`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Gallery
  getPhotos(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.baseUrl}/gallery`)
      .pipe(catchError(err => this.handleError(err)));
  }

  getImages(filter: string): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.baseUrl}/gallery?category=${filter}`)
      .pipe(catchError(err => this.handleError(err)));
  }

  uploadImage(formData: FormData, category: string): Observable<GalleryImage> {
    return this.http.post<GalleryImage>(`${this.baseUrl}/gallery/upload?category=${category}`, formData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/gallery/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
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

  uploadSectionImage(imageData: FormData): Observable<SectionImage> {
    return this.http.post<SectionImage>(`${this.baseUrl}/section-image/upload`, imageData, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  deleteSectionImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/section-image/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(err => this.handleError(err)));
  }

  // Newsletter
  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/newsletter/subscribe`, { email })
      .pipe(catchError(err => this.handleError(err)));
  }

  // Admin Login
  adminLogin(credentials: any): Observable<{ token: string, refreshToken: string, email: string, role: string }> {
    return this.http.post<{ token: string, refreshToken: string, email: string, role: string }>(`${this.baseUrl}/account/login`, credentials)
      .pipe(catchError(err => this.handleError(err)));
  }

  // Refresh Token
  refreshToken(tokens: { accessToken: string | null, refreshToken: string | null }): Observable<any> {
    if (!tokens.accessToken || !tokens.refreshToken) {
      return throwError(() => new Error('Missing tokens for refresh'));
    }
    return this.http.post<any>(`${this.baseUrl}/account/refresh`, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
