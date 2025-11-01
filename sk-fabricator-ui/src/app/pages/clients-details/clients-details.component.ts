import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';

@Component({
  standalone: true,
  selector: 'app-clients-details',
  imports: [CommonModule],
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss'],
  // Set to OnPush for performance, aligning with modern Angular practices
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ClientsDetailsComponent implements OnInit {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);

  clientImages = signal<SectionImage[]>([]);

  ngOnInit(): void {
    this.loadClientImages();
  }

  loadClientImages(): void {
    this.apiService.getSectionImagesBySectionName('ClientsDetailsComponent').subscribe({
      next: (images) => {
        this.clientImages.set(images);
      },
      error: (err) => {
        console.error('Failed to load client images for ClientsDetailsComponent', err);
      }
    });
  }
}