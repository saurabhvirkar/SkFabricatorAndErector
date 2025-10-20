import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss'],
})
export class AboutDetailsComponent {
  // Component setup
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);
   // Array of images for the slider
  slides: string[] = [
    'https://placehold.co/800x600/1e40af/ffffff?text=Piping+and+Fabrication+Site+1',
    'https://placehold.co/800x600/1e40af/ffffff?text=Piping+and+Fabrication+Site+2',
    'https://placehold.co/800x600/1e40af/ffffff?text=Piping+and+Fabrication+Site+3',
    'https://placehold.co/800x600/1e40af/ffffff?text=Piping+and+Fabrication+Site+4',
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
      }, 5000); // Slide every 5 seconds
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