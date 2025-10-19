import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { ClientDetails } from '../../_models/data.model'; // Added for type safety

@Component({
  standalone: true,
  selector: 'app-clients-details',
  imports: [CommonModule],
  templateUrl: './clients-details.component.html', // Now pointing to the new content
  styleUrls: ['./clients-details.component.scss']
})
export class ClientsDetailsComponent {
  private dataService = inject(DataService);
  // Type added for better code quality
  clientDetails: ClientDetails[] = this.dataService.getClientDetails(); 
}