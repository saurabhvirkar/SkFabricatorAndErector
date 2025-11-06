import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDetails } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiService = inject(ApiService);

  getClientDetails(): Observable<ClientDetails[]> {
    return this.apiService.get<ClientDetails[]>('clients');
  }

  addClient(clientData: FormData): Observable<ClientDetails> {
    return this.apiService.post<ClientDetails>('clients', clientData, true);
  }

  deleteClient(id: number): Observable<any> {
    return this.apiService.delete<any>(`clients/${id}`);
  }

  addClientImage(imageData: FormData): Observable<ClientDetails> {
    return this.apiService.post<ClientDetails>('clients/add-image', imageData, true);
  }

  updateClient(id: number, clientData: ClientDetails): Observable<ClientDetails> {
    return this.apiService.put<ClientDetails>(`clients/${id}`, clientData);
  }
}