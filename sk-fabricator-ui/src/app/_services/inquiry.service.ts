import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Inquiry } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private apiService = inject(ApiService);

  getInquiries(): Observable<Inquiry[]> {
    return this.apiService.get<Inquiry[]>('inquiry');
  }

  deleteInquiry(id: number): Observable<any> {
    return this.apiService.delete<any>(`inquiry/${id}`);
  }

  submitInquiry(inquiryData: any): Observable<any> {
    return this.apiService.post('inquiry', inquiryData);
  }
}
