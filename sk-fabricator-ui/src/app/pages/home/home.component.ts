import { Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccoladesComponent } from '../../accolades/accolades.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { DataService } from '../../_services/data.service';
import { RouterLink } from '@angular/router';
import { AboutDetailsComponent } from '../about-details/about-details.component';

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
export class HomeComponent implements OnDestroy {
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);

  featuredServices = this.dataService.getServices().slice(0, 3);

  // Background slider properties
  backgroundSlides: string[] = [
    'assets/photo1.jpg',
    'https://placehold.co/1920x1080/1e40af/ffffff?text=Industrial+Site+2',
    'https://placehold.co/1920x1080/166534/ffffff?text=Fabrication+Workshop',
    'https://placehold.co/1920x1080/be123c/ffffff?text=Completed+Project',
  ];
  currentSlideIndex = 0;
  private intervalId: any;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % this.backgroundSlides.length;
      }, 3000); // Change image every 5 seconds
    }
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}