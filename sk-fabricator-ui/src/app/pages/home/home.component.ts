import { Component, inject, OnDestroy, PLATFORM_ID, OnInit, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccoladesComponent } from '../../accolades/accolades.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { DataService } from '../../_services/data.service';
import { RouterLink } from '@angular/router';
import { AboutDetailsComponent } from '../about-details/about-details.component';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AccoladesComponent,
    InquiryFormComponent,
    RouterLink,
    AboutDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  featuredServices = this.dataService.getServices().slice(0, 3);

  // Background slider properties
  backgroundSlides = signal<SectionImage[]>([]);
  currentSlideIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.loadBackgroundSlides();
  }

  loadBackgroundSlides(): void {
    this.apiService.getSectionImagesBySectionName('HomeComponent').subscribe({
      next: (images) => {
        this.backgroundSlides.set(images);
        if (isPlatformBrowser(this.platformId) && images.length > 0) {
          this.startAutoSlide();
        }
      },
      error: (err) => {
        console.error('Failed to load background slides for HomeComponent', err);
      }
    });
  }

  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId) && this.backgroundSlides().length > 0) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % this.backgroundSlides().length;
      }, 3000); // Change image every 3 seconds
    }
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}