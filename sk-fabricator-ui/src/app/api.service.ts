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
  adminLogin(credentials: any): Observable<{ success: boolean, token?: string, message: string, role?: string }> {
    console.log('Attempting admin login:', credentials);
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return of({ success: true, token: 'mock-jwt-token-admin', message: 'Login successful.', role: 'admin' });
    }
    return of({ success: false, message: 'Invalid username or password.' });
  }

  // Mock get inquiries
  getInquiries(): Observable<Inquiry[]> {
    const mockInquiries: Inquiry[] = [
      { name: 'John Doe', email: 'john.doe@example.com', subject: 'Piping Project', message: 'Looking for a quote on a new piping installation.', phone: '123-456-7890', category: 'Piping', preferredContact: 'Email' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', subject: 'Fabrication Inquiry', message: 'Need custom steel fabrication for a warehouse.', phone: '987-654-3210', category: 'Fabrication', preferredContact: 'Phone' },
    ];
    return of(mockInquiries);
  }

  // Mock newsletter subscription
  subscribeNewsletter(email: string): Observable<{ success: boolean, message: string }> {
    console.log('Subscribing email:', email);
    return of({ success: true, message: 'Subscription successful. Check your email to confirm.' });
  }
}
