import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiService = inject(ApiService);

  getServices(): Observable<Service[]> {
    return this.apiService.get<Service[]>('our-services');
  }

  addService(serviceData: FormData): Observable<Service> {
    return this.apiService.post<Service>('our-services', serviceData, true);
  }

  updateService(serviceId: number, serviceData: any): Observable<Service> {
    return this.apiService.put<Service>(`our-services/${serviceId}`, serviceData);
  }

  deleteService(serviceId: number): Observable<any> {
    return this.apiService.delete<any>(`our-services/${serviceId}`);
  }

  addServiceImage(imageData: FormData): Observable<Service> {
    return this.apiService.post<Service>('our-services/add-image', imageData, true);
  }
}