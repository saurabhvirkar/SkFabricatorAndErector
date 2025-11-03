import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../api.service';
import { Photo } from '../../_models/photo.model'; // Use Photo model for about slider images

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDetailsComponent implements OnInit {
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  sectionImages = signal<Photo[]>([]); // Use Photo model
  currentSlideIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.loadAboutSliderImages();
  }

  loadAboutSliderImages(): void {
    this.apiService.getPhotos().subscribe({
      next: (images) => {
        this.sectionImages.set(images.filter(image => image.isAboutSlider));
        if (this.sectionImages().length > 1) {
          this.startSlider();
        }
      },
      error: (err) => {
        console.error('Failed to load about slider images', err);
      }
    });
  }

  startSlider(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change image every 5 seconds
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % totalSlides;
  }

  prevSlide(): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex - 1 + totalSlides) % totalSlides;
  }

  changeSlide(direction: number): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex + direction + totalSlides) % totalSlides;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }
}