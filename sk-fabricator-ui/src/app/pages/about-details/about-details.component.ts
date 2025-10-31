import { Component, inject, PLATFORM_ID, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss'],
  // Added ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class AboutDetailsComponent implements OnDestroy { // Implements OnDestroy
  // Component setup
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);
  
  // Array of images for the slider
  slides: string[] = [ // Updated with premium fabrication and erection images
    'https://images.pexels.com/photos/8293739/pexels-photo-8293739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Large scale steel structure erection
    'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Interior of a fabrication workshop
    'https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Workers on a steel frame
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'  // Close-up of a welder
  ];

  currentSlideIndex: number = 0;
  
  // Optional: Set up interval for auto-sliding
  private intervalId: any;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  // Change slide by a relative step (+1 for next, -1 for previous)
  changeSlide(step: number): void {
    const totalSlides = this.slides.length;
    // Calculate the new index, ensuring it wraps around (circular)
    this.currentSlideIndex = (this.currentSlideIndex + step + totalSlides) % totalSlides;
    this.resetAutoSlide();
  }

  // Go to a specific slide index (used for dot navigation)
  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.resetAutoSlide();
  }

  // Logic for auto-sliding
  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
      }, 3000); // Slide every 3 seconds
    }
  }

  resetAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.intervalId);
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}