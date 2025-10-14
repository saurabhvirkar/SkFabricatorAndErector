import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

/**
 * A service for handling external API calls like form submissions or admin login.
 * In a real app, this would use HttpClient.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api'; // Dummy base URL

  // Mock form submission
  submitInquiry(formData: any): Observable<{ success: boolean, message: string }> {
    console.log('Submitting inquiry:', formData);
    // In a real application, you would use:
    // return this.http.post(`${this.baseUrl}/inquiry`, formData);
    return of({ success: true, message: 'Inquiry received successfully. We will contact you shortly.' });
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
