import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryImage } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiService = inject(ApiService);

  getPhotos(): Observable<GalleryImage[]> {
    return this.apiService.get<GalleryImage[]>('gallery');
  }

  getImages(filter: string): Observable<GalleryImage[]> {
    let url = 'gallery';
    if (filter !== 'All') {
      url += `?category=${filter}`;
    }
    return this.apiService.get<GalleryImage[]>(url);
  }

  uploadImage(formData: FormData, category: string, isAboutSlider: boolean): Observable<GalleryImage> {
    formData.append('category', category);
    formData.append('isAboutSlider', isAboutSlider.toString());
    return this.apiService.post<GalleryImage>('gallery/add-photo', formData, true);
  }

  deleteImage(id: number): Observable<any> {
    return this.apiService.delete<any>(`gallery/delete-photo/${id}`);
  }
}