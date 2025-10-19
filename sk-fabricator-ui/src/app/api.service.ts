import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Inquiry } from './_models/inquiry.model';

/**
 * A service for handling external API calls like form submissions or admin login.
 * In a real app, this would use HttpClient.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  // The proxy will forward requests starting with /api to your backend
  private apiUrl = '/api';

  /**
   * Submits the inquiry form data to the backend API.
   */
  submitInquiry(inquiryData: Inquiry): Observable<{ success: boolean, message: string }> {
    debugger
    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrl}/Inquiry`, inquiryData);
  }
  
  // Mock admin login
  adminLogin(credentials: any): Observable<{ success: boolean, token?: string, message: string }> {
    console.log('Attempting admin login:', credentials);
    if (credentials.username === 'admin' && credentials.password === 'password123') {
      return of({ success: true, token: 'mock-jwt-token', message: 'Login successful.' });
    }
    return of({ success: false, message: 'Invalid username or password.' });
  }

  // Mock newsletter subscription
  subscribeNewsletter(email: string): Observable<{ success: boolean, message: string }> {
    console.log('Subscribing email:', email);
    return of({ success: true, message: 'Subscription successful. Check your email to confirm.' });
  }
}
