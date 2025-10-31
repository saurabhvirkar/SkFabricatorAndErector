import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../_services/data.service';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, InquiryFormComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  // Added ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class ServicesComponent {
  private dataService = inject(DataService);
  allServices = this.dataService.getServices();
}