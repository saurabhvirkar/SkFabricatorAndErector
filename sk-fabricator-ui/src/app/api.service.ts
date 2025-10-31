import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry } from './_models/inquiry.model'; // Assuming this model exists
import { environment } from './environments/environment';

/**
 * A service for handling external API calls like form submissions or admin login.
 * In a real app, this would use HttpClient.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  // The proxy forwards requests starting with /api to your backend
  private apiUrl = environment.apiUrl;

  /**
   * Submits the inquiry form data to the backend API.
   */
  submitInquiry(inquiryData: Inquiry): Observable<Inquiry> {
    return this.http.post<Inquiry>(`${this.apiUrl}/inquiry`, inquiryData);
  }
  
  // Mock admin login
  adminLogin(credentials: any): Observable<{ token: string, refreshToken: string, email: string, role: string }> {  
    return this.http.post<{ token: string, refreshToken: string, email: string, role: string }>(`${this.apiUrl}/account/login`, credentials);
  }

  // Refresh token
  refreshToken(tokens: { accessToken: string | null, refreshToken: string | null }): Observable<{ token: string, refreshToken: string }> {
    return this.http.post<{ token: string, refreshToken: string }>(`${this.apiUrl}/account/refresh-token`, tokens);
  }

  // Get inquiries from the backend (requires authorization)
  getInquiries(): Observable<Inquiry[]> {
    // The AuthInterceptor automatically adds the Authorization header.
    return this.http.get<Inquiry[]>(`${this.apiUrl}/inquiry`);
  }

  // Delete an inquiry by its ID
  deleteInquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inquiry/${id}`);
  }

  // Real newsletter subscription
  subscribeNewsletter(email: string): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrl}/newsletter`, { email });
  }
}
