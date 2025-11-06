import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiService = inject(ApiService);

  subscribeNewsletter(email: string): Observable<any> {
    return this.apiService.post('newsletter/subscribe', { email });
  }
}