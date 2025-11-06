import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeSlider } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderService {
  private apiService = inject(ApiService);

  getHomeSliders(): Observable<HomeSlider[]> {
    return this.apiService.get<HomeSlider[]>('home-slider');
  }

  addHomeSlider(homeSliderData: { title: string, description: string }): Observable<HomeSlider> {
    return this.apiService.post<HomeSlider>('home-slider', homeSliderData);
  }

  addHomeSliderImage(imageData: FormData): Observable<HomeSlider> {
    return this.apiService.post<HomeSlider>('home-slider/add-image', imageData, true);
  }

  updateHomeSlider(id: number, homeSliderData: { title: string, description: string }): Observable<HomeSlider> {
    return this.apiService.put<HomeSlider>(`home-slider/${id}`, homeSliderData);
  }

  deleteHomeSlider(id: number): Observable<any> {
    return this.apiService.delete<any>(`home-slider/${id}`);
  }
}