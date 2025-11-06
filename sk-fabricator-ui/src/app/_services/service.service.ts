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
    return this.apiService.get<Service[]>('services');
  }

  addService(serviceData: FormData): Observable<Service> {
    return this.apiService.post<Service>('services', serviceData, true);
  }

  updateService(serviceId: number, serviceData: any): Observable<Service> {
    return this.apiService.put<Service>(`services/${serviceId}`, serviceData);
  }

  deleteService(serviceId: number): Observable<any> {
    return this.apiService.delete<any>(`services/${serviceId}`);
  }

  addServiceImage(imageData: FormData): Observable<Service> {
    return this.apiService.post<Service>('services/image', imageData, true);
  }
}