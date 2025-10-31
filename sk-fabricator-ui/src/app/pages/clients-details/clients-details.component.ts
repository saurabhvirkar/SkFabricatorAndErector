import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { ClientDetails } from '../../_models/data.model';

@Component({
  standalone: true,
  selector: 'app-clients-details',
  imports: [CommonModule],
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss'],
  // Set to OnPush for performance, aligning with modern Angular practices
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ClientsDetailsComponent {
  private dataService = inject(DataService);
  // Ensure data is accessed directly from the service or a signal/observable pipeline
  clientDetails: ClientDetails[] = this.dataService.getClientDetails(); 
}