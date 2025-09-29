import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://localhost:5001/api'; // Adjust if needed

  constructor(private http: HttpClient) {}

  submitInquiry(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/inquiry`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/login`, data);
  }

  subscribeNewsletter(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/newsletter`, data);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`);
  }
}
