import { Component, inject, PLATFORM_ID, ChangeDetectionStrategy, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../_services/data.service';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDetailsComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);
  
  sectionImages = signal<SectionImage[]>([]);
  currentSlideIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.loadSliderImages();
  }

  loadSliderImages(): void {
    this.apiService.getSectionImagesBySectionName('AboutDetailsComponent').subscribe({
      next: (images) => {
        this.sectionImages.set(images);
        if (isPlatformBrowser(this.platformId) && images.length > 0) {
          this.startAutoSlide();
        }
      },
      error: (err) => {
        console.error('Failed to load slider images for AboutDetailsComponent', err);
      }
    });
  }

  changeSlide(step: number): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex + step + totalSlides) % totalSlides;
    this.resetAutoSlide();
  }

  goToSlide(index: number): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = index;
    this.resetAutoSlide();
  }

  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId) && this.sectionImages().length > 0) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.sectionImages().length;
      }, 3000);
    }
  }

  resetAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.intervalId);
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}