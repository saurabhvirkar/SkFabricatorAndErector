import { Component, inject, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { DataService } from '../../_services/data.service';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';
import { Service } from '../../_models/data.model'; // Import the correct Service interface

interface DynamicService extends Service {
  dynamicImageUrl?: string; // Add dynamicImageUrl to the extended interface
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, InquiryFormComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  // Added ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class ServicesComponent implements OnInit {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);

  staticServices: Service[] = [];
  dynamicServices = signal<DynamicService[]>([]);

  ngOnInit(): void {
    this.staticServices = this.dataService.getServices();
    this.loadServiceImages();
  }

  loadServiceImages(): void {
    this.apiService.getSectionImagesBySectionName('ServicesComponent').subscribe({
      next: (sectionImages) => {
        const combinedServices: DynamicService[] = this.staticServices.map((service, index) => {
          const dynamicImage = sectionImages[index]; // Simple mapping by index
          return {
            ...service,
            dynamicImageUrl: dynamicImage ? dynamicImage.url : service.image.src // Use dynamic if available, else static
          };
        });
        this.dynamicServices.set(combinedServices);
      },
      error: (err) => {
        console.error('Failed to load service images for ServicesComponent', err);
        // Fallback to static images if API call fails
        this.dynamicServices.set(this.staticServices.map(s => ({ ...s, dynamicImageUrl: s.image.src })));
      }
    });
  }
}