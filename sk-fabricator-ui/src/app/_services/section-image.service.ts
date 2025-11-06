import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionImage } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SectionImageService {
  private apiService = inject(ApiService);

  getSectionImage(section: string): Observable<SectionImage> {
    return this.apiService.get<SectionImage>(`section-image/${section}`);
  }

  getSectionImagesBySectionName(sectionName: string): Observable<SectionImage[]> {
    return this.apiService.get<SectionImage[]>(`section-image/${sectionName}`);
  }

  uploadSectionImage(imageData: FormData, sectionName: string): Observable<SectionImage> {
    imageData.append('sectionName', sectionName);
    return this.apiService.post<SectionImage>('section-image/add-image', imageData, true);
  }

  deleteSectionImage(id: number): Observable<any> {
    return this.apiService.delete<any>(`section-image/${id}`);
  }
}