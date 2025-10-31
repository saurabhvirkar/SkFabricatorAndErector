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
    'https://images.pexels.com/photos/7218568/pexels-photo-7218568.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    'https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    'https://images.pexels.com/photos/4397773/pexels-photo-4397773.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
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